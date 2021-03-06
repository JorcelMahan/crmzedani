import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DataClients from '../components/Ventas/DataClients';
import DataSale from '../components/Ventas/DataSale';
import Review from '../components/Ventas/Review';
import { useRouter } from 'next/router';
import VentasContext from '../context/ventas/VentasContext';
import { useMutation, gql } from '@apollo/client';
import Loader from '../components/Loader';
import Alert from '@material-ui/lab/Alert';

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
      width: 1000,
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

const steps = ['Datos del comprador', 'Datos de la factura', 'Revisa'];

function getStepContent(step, setActiveBtn) {
  switch (step) {
    case 0:
      return <DataClients setActiveBtn={setActiveBtn} />;
    case 1:
      return <DataSale setActiveBtn={setActiveBtn} />;
    case 2:
      return <Review setActiveBtn={setActiveBtn} />;

    default:
      throw new Error('Unknown step');
  }
}

function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [activeBtn, setActiveBtn] = useState(true);
  const router = useRouter();
  const ventasContext = useContext(VentasContext);
  const {
    products,
    promotora,
    total,
    cliente,
    resetState,
    metodo,
    reciboNota,
    factura,
    montoEfectivo,
    montoTarjeta,
    montoDeposito,
    vendedor,
    giftCard,
  } = ventasContext;
  const [addVenta, { loading, error }] = useMutation(ADD_VENTA);
  const handleClick = async () => {
    try {
      await addVenta({
        variables: {
          input: {
            productos: products,
            idPromotora: promotora.id ? promotora.id : null,
            cliente: cliente.id ? cliente.id : null,
            metodo,
            reciboNota,
            factura,
            total: Number(total),
            montoEfectivo: Number(montoEfectivo),
            montoTarjeta: Number(montoTarjeta),
            montoDeposito: Number(montoDeposito),
            vendedor,
            giftCard,
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
    <>
      <CssBaseline />
      <main className={classes.layout}>
        {loading && <Loader />}

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
          {error && <Alert severity='error'>{error.message}</Alert>}
          <>
            {getStepContent(activeStep, setActiveBtn)}
            <div className={classes.buttons}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} className={classes.button}>
                  Atras
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleClick}
                  className={classes.button}
                  disabled={activeBtn}>
                  Confirmar Venta
                </Button>
              ) : (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleNext}
                  className={classes.button}
                  disabled={activeBtn}>
                  Siguiente
                </Button>
              )}
            </div>
          </>
        </Paper>
      </main>
    </>
  );
}

export default Checkout;
