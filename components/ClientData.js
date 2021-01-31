import React, { useState, useEffect, useContext } from "react";
import VentasContext from "../context/ventas/VentasContext";
import { useQuery, gql, useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import { Box, CircularProgress, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Loader from "../components/Loader";
import Alert from "@material-ui/lab/Alert";

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
    newCliente(input: $input) {
      id
      razonSocial
      nitoci
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  boxNewClient: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "1rem",
  },
  boxClient: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
}));

const RazonSocial = ({ cliente, setActiveBtn, nitoci }) => {
  const { selectCliente, selectPromotora } = useContext(VentasContext);
  const [
    newCliente,
    { loading: loadingClient, error: errorClient },
  ] = useMutation(NEW_CLIENTE);

  const [razonSocial, setRazonSocial] = useState("");

  useEffect(() => {
    if (cliente) {
      selectCliente({
        id: cliente.id,
        razonSocial: cliente.razonSocial,
        nitoci: cliente.nitoci,
      });
      selectPromotora("");
      setRazonSocial(cliente.razonSocial);

      // setActiveBtn(false);
    } else {
      selectCliente("");
      setRazonSocial("");
      // setActiveBtn(true);
    }
  }, [cliente]);

  useEffect(() => {
    if (razonSocial === "") {
      setActiveBtn(true);
    } else {
      setActiveBtn(false);
    }
  }, [razonSocial]);

  // if (loading) return <CircularProgress color='secondary' />;
  if (loadingClient) return <Loader />;
  if (errorClient) return `${errorClient}`;
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
        // // cache
        // update: (cache, { data: { newCliente } }) => {
        //   const data = cache.readQuery({
        //     query: GET_CLIENTE_BY_NIT,
        //   });
        //   data.getNITCliente = [...data.getNITCliente, newCliente];
        //   cache.writeQuery({ query: GET_CLIENTE_BY_NIT });
        // },
      });
      alert("Cliente creado con exito");
      console.log(msg);
      selectCliente(msg.data.newCliente);
      setActiveBtn(false);
      selectPromotora("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {errorClient && <Alert severity="error">{errorClient}</Alert>}
      <Box display="flex">
        <TextField
          label="Razon Social"
          value={cliente !== null ? cliente.razonSocial : razonSocial}
          onChange={handleChange}
        />
        {cliente === null && (
          <Button color="primary" onClick={saveClient}>
            Guardar
          </Button>
        )}
      </Box>
    </>
  );
};

const ClientData = ({ setActiveBtn }) => {
  const classes = useStyles();
  const [nitoci, setNitoci] = useState("");
  const [enter, setEnter] = useState("");

  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_CLIENTE_BY_NIT,
    {
      variables: {
        nitoci: enter,
      },
      // fetchPolicy: "no-cache",
    }
  );
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setEnter(nitoci);
    }
  };
  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);
  if (loading) return <Loader />;
  if (error) return `${error.message}`;
  const { getNITCliente } = data;
  return (
    <div className={classes.boxNewClient}>
      <h2>Datos del Cliente</h2>
      <div className={classes.boxClient}>
        <div>
          <TextField
            label="NIT o CI"
            value={nitoci}
            onChange={(e) => setNitoci(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>

        <RazonSocial
          cliente={getNITCliente}
          nitoci={nitoci}
          setActiveBtn={setActiveBtn}
        />
      </div>
    </div>
  );
};

export default ClientData;
