import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AsignProducts from '../components/ventas/AsignProducts';
import Dataclients from '../components/ventas/Dataclients';
import Review from '../components/ventas/Review';
import { useRouter } from 'next/router';
import VentasContext from '../context/ventas/VentasContext';
import { useMutation, gql } from '@apollo/client';

const ADD_VENTA = gql`
  mutation addVenta($input: VentasInput) {
    addVenta(input: $input)
  }
`;

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Elije los productos', 'Datos del comprador', 'Revisa la orden'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AsignProducts />;
    case 1:
      return <Dataclients />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const router = useRouter();
  const ventasContext = useContext(VentasContext);
  const { products, promotora, total, cliente, resetState } = ventasContext;
  const [addVenta] = useMutation(ADD_VENTA);

  const handleClick = async () => {
    try {
      await addVenta({
        variables: {
          input: {
            productos: products,
            idPromotora: promotora,
            cliente,
            total,
          },
        },
      });
      resetState();
      router.push('/ventas');
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {getStepContent(activeStep)}
            <div className={classes.buttons}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} className={classes.button}>
                  Back
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleClick}
                  className={classes.button}
                >
                  Confirmar Venta
                </Button>
              ) : (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleNext}
                  className={classes.button}
                >
                  Next
                </Button>
              )}
            </div>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
