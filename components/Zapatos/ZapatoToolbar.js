import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SearchInput from "../SearchInput/SearchInput";
import { CSVLink } from "react-csv";
import Link from "next/link";
import AuthContext from "../../context/auth/AuthContext";
import { useQuery, gql } from "@apollo/client";
import ReactSelect from "react-select";

const GET_COLORS = gql`
  query colors {
    colors {
      id
      nombre
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {},
  row: {
    height: "42px",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  exportButton: {
    marginRight: theme.spacing(1),
    backgroundColor: "#21A464",
    "&:hover": {
      backgroundColor: "#21A414",
    },
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
  csvLink: {
    textDecoration: "none",
    color: "white",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  total: {
    justifySelf: "flex-end",
    alignSelf: "flex-end",
    marginLeft: "auto",
  },
}));

const options = [
  { value: "t19", label: "19" },
  { value: "t20", label: "20" },
  { value: "t21", label: "21" },
  { value: "t22", label: "22" },
  { value: "t23", label: "23" },
  { value: "t24", label: "24" },
  { value: "t25", label: "25" },
  { value: "t26", label: "26" },
  { value: "t27", label: "27" },
  { value: "t28", label: "28" },
  { value: "t29", label: "29" },
  { value: "t30", label: "30" },
  { value: "t31", label: "31" },
  { value: "t32", label: "32" },
  { value: "t33", label: "33" },
  { value: "t34", label: "34" },
  { value: "t35", label: "35" },
  { value: "t36", label: "36" },
  { value: "t37", label: "37" },
  { value: "t38", label: "38" },
  { value: "t39", label: "39" },
  { value: "t40", label: "40" },
  { value: "t41", label: "41" },
  { value: "t42", label: "42" },
  { value: "t43", label: "43" },
  { value: "t44", label: "44" },
  { value: "t45", label: "45" },
  { value: "t46", label: "46" },
];

const optionsFilter2 = [
  { value: "todos", label: "Todos" },
  { value: "hombre", label: "Hombre" },
  { value: "mujer", label: "Dama" },
  { value: "seguridad", label: "Seguridad" },
  { value: "enfermera", label: "Enfermera" },
  // { value: 'niños', label: 'Niños' },
  { value: "escolar", label: "Escolar" },
  { value: "marroquineria", label: "Marroquineria" },
  { value: "accesorios", label: "Accesorios" },
];

const ZapatoToolbar = (props) => {
  const {
    className,
    setQuery,
    query,
    csvData,
    field,
    setfield,
    totalZapatos,
    setColor,
    setTalla,
    talla,
    ...rest
  } = props;
  const { loading, error, data } = useQuery(GET_COLORS);
  const [totalShoes, totalAccesorios] = totalZapatos;
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  if (loading) return "Loading";
  if (error) return `${error}`;
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <FormControl className={classes.formControl} style={{ zIndex: 1000 }}>
          <ReactSelect
            options={data.colors}
            getOptionValue={(op) => op.id}
            getOptionLabel={(op) => op.nombre}
            onChange={(op) => {
              setColor(op.nombre);
              setTalla("");
            }}
            placeholder="Color"
            noOptionsMessage={() => "No existen zapatos con ese color"}
          />
        </FormControl>
        <FormControl className={classes.formControl} style={{ zIndex: 1000 }}>
          <ReactSelect
            options={options}
            onChange={(op) => {
              setTalla(op.value);
              setColor("");
            }}
            placeholder="Tallas"
            defaultValue={talla}
            noOptionsMessage={() => "No existe esa talla"}
          />
        </FormControl>
        <FormControl className={classes.formControl} style={{ zIndex: 1000 }}>
          <ReactSelect
            options={optionsFilter2}
            placeholder="Tipo"
            defaultValue={field}
            onChange={(op) => setfield(op.value)}
          />
        </FormControl>
      </div>
      <div className={classes.row}>
        <span className={classes.spacer} />

        <Button className={classes.exportButton}>
          <CSVLink
            data={csvData}
            filename={`inventario-${new Date().getDay()}-${new Date().getMonth()}-${new Date().getFullYear()}-${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}.csv`}
            className={classes.csvLink}
          >
            Exportar
          </CSVLink>
        </Button>

        {user === "patrick" && (
          <Link href="/new-zapato">
            <Button color="primary" variant="contained">
              Add Zapato
            </Button>
          </Link>
        )}
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Buscar zapato"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p className={classes.total}>
          Z: <b>{totalShoes}</b> A: <b>{totalAccesorios}</b>
        </p>
      </div>
    </div>
  );
};

export default ZapatoToolbar;
