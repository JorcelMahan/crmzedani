import React, { useState, useEffect, useContext } from 'react';
import VentasContext from '../context/ventas/VentasContext';
import { useQuery, gql, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Loader from '../components/Loader';
import Alert from '@material-ui/lab/Alert';

const GET_CLIENTE_BY_NIT = gql`
  query getNITCliente($nitoci: String!) {
    getNITCliente(nitoci: $nitoci) {
      id
      razonSocial
      nitoci
    }
  }
`;

const NEW_CLIENTE = gql`
  mutation newCliente($input: ClienteInput) {
    newCliente(input: $input)
  }
`;

const useStyles = makeStyles((theme) => ({
  boxNewClient: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1rem',
  },
  boxClient: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

const RazonSocial = ({ nitoci, setActiveBtn }) => {
  const { selectCliente } = useContext(VentasContext);
  const [
    newCliente,
    { loading: loadingClient, error: errorClient },
  ] = useMutation(NEW_CLIENTE);
  const { loading, error, data } = useQuery(GET_CLIENTE_BY_NIT, {
    variables: {
      nitoci,
    },
  });
  const [razonSocial, setRazonSocial] = useState('');
  //   const [idNewClient, setIdNewClient] = useState(false);
  useEffect(() => {
    if (data) {
      if (data.getNITCliente) {
        setActiveBtn(false);
        setRazonSocial(data.getNITCliente.razonSocial);
        selectCliente(data.getNITCliente.id);
      } else {
        setActiveBtn(true);
        setRazonSocial('');
        selectCliente('');
      }
    }
  }, [nitoci]);

  if (loading) return <CircularProgress color='secondary' />;
  if (loadingClient) return <Loader />;
  if (error) return `${error}`;
  const handleChange = (e) => {
    setRazonSocial(e.target.value);
  };
  const saveClient = async () => {
    try {
      const msg = await newCliente({
        variables: {
          input: {
            nitoci,
            razonSocial,
          },
        },
      });
      alert('Cliente creado con exito');
      selectCliente(msg.data.newCliente);
      setActiveBtn(false);
      //   setIdNewClient(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {errorClient && <Alert severity='error'>{errorClient}</Alert>}
      <Box display='flex'>
        <TextField
          label='Razon Social'
          value={
            data.getNITCliente !== null
              ? data.getNITCliente.razonSocial
              : razonSocial
          }
          onChange={handleChange}
        />
        {data.getNITCliente === null && (
          <Button color='primary' onClick={saveClient}>
            Guardar
          </Button>
        )}
      </Box>
    </>
  );
};

const ClientData = ({ setActiveBtn }) => {
  const classes = useStyles();
  const [nitoci, setNitoci] = useState('');
  return (
    <div className={classes.boxNewClient}>
      <h2>Datos del Cliente</h2>
      <div className={classes.boxClient}>
        <div>
          <TextField
            label='NIT o CI'
            value={nitoci}
            onChange={(e) => setNitoci(e.target.value)}
          />
        </div>
        <RazonSocial nitoci={nitoci} setActiveBtn={setActiveBtn} />
      </div>
    </div>
  );
};

export default ClientData;
