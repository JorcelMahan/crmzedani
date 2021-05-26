import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import SalidaContext from '../context/salidas/SalidaContext';
import { useMutation, gql } from '@apollo/client';
import DataSalida from '../components/Salidas/DataSalida';
import SalidaReview from '../components/Salidas/SalidaReview';
import Loader from '../components/Loader';
import Alert from '@material-ui/lab/Alert';
import { Today } from '@material-ui/icons';

const ADD_SALIDA = gql`
  mutation addSalida($input: SalidaInput) {
    addSalida(input: $input)
  }
`;
const GET_SALIDAS = gql`
  query salidasByDate($date: String!) {
    salidasByDate(date: $date) {
      id
      codigo
      products {
        id
        codigo
        color
        sizeSale
        quantity
        image
      }
      totalProducts
      almacen
      retiradoPor
      retiradoHacia
      fechaSalida
      status
    }
  }
`;

const getCurrentDateFormat = () => {
  const currentDate = new Date()
    .toLocaleString('es-MX', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .split('/');
  const currDateStr = `${currentDate[2]}-${currentDate[1]}-${currentDate[0]}`;
  return currDateStr;
}

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 800,
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

const steps = ['Datos de la Salida', 'Revisa la Salida'];

function getStepContent(step, setActiveBtn) {
  switch (step) {
    case 0:
      return <DataSalida setActiveBtn={setActiveBtn} />;
    case 1:
      return <SalidaReview />;
    default:
      throw new Error('Unknown step');
  }
}

function SalidaCheckout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [activeBtn, setActiveBtn] = useState(true);
  const router = useRouter();
  const salidaContext = useContext(SalidaContext);
  const {
    products,
    almacen,
    retiradoPor,
    totalProducts,
    resetState,
  } = salidaContext;
  const [addSalida, { loading, error }] = useMutation(ADD_SALIDA);

  const handleClick = async () => {
    try {
      await addSalida({
        variables: {
          input: {
            products,
            almacen,
            retiradoPor,
            totalProducts: Number(totalProducts),
          },
        },
      });
      resetState();
      // put the salidas in the date of Today
      sessionStorage.setItem('localSalida', getCurrentDateFormat())
      await router.push('/salidas');

    } catch (error) {
      console.log('Error', error);
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
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4' align='center'>
            Salida
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {loading && <Loader />}
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
                  disabled={loading}
                >
                  Confirmar Salida
                </Button>
              ) : (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleNext}
                  className={classes.button}
                  disabled={activeBtn}
                >
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

export default SalidaCheckout;
