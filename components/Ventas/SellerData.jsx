import React, { useState, useEffect, useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../../context/auth/AuthContext";
import VentasContext from "../../context/ventas/VentasContext";
import Select from "react-select";

const useStyles = makeStyles((theme) => ({
  boxNewClient: {
    marginTop: "20px",
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

const EMPLOYEES_STORE = gql`
  query employeeStore($store: String!) {
    employeeStore(store: $store) {
      id
      name
    }
  }
`;

const Sellers = ({ store }) => {
  // const aux = store === "patrick" ? "sopocachi" : store;
  const { addVendedor } = useContext(VentasContext);
  const { data, loading, error } = useQuery(EMPLOYEES_STORE, {
    variables: {
      store,
    },
  });
  const [selectedSeller, setSelectedSeller] = useState("");
  useEffect(() => {
    if (selectedSeller !== "") {
      addVendedor(selectedSeller.id);
    }
  }, [selectedSeller]);
  if (loading) return "Loading";
  if (error) return `${error.message}`;
  const { employeeStore } = data;
  return (
    <div>
      <Select
        onChange={(op) => setSelectedSeller(op)}
        options={employeeStore}
        placeholder="Seleccione al vendedor"
        getOptionValue={(op) => op.id}
        getOptionLabel={(op) => `${op.name}`}
        noOptionsMessage={() => "No hay resultados"}
      />
    </div>
  );
};

const SellerData = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  return (
    <div className={classes.boxNewClient}>
      <h2>Datos del Vendedor</h2>
      <div>
        <Sellers store={user} />
      </div>
    </div>
  );
};

export default SellerData;
