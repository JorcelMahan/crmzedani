import React, { useState, useContext, useEffect } from "react";
import ListZapatos from "./ListZapatos";
import ZapatoToolbar from "./ZapatoToolbar";
import { makeStyles } from "@material-ui/core/styles";
import { useSearch, useFilterBy } from "../../hooks/useSearch";
import ListCardViewProducts from "./ListCardViewProducts";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AuthContext from "../../context/auth/AuthContext";
import ListZapatosChildren from "./ListZapatosChildren";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },

  content: {
    marginTop: theme.spacing(2),
  },
}));

const getTotalOfShoes = (shoes) => {
  let totalShoes = 0;
  let totalAccesorios = 0;
  //   shoes.forEach((shoe) => (total += shoe.stock));
  shoes.forEach((shoe) => {
    if (shoe.tipo !== "accesorios") {
      totalShoes += shoe.stock;
    } else {
      totalAccesorios += shoe.stock;
    }
  });
  return [totalShoes, totalAccesorios];
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}
const WrapperZapatos = ({ zapatos, almacen, setColor, setTalla, talla }) => {
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const { field, setfield, filteredElem } = useFilterBy(
    zapatos,
    "tipo",
    "todos"
  );
  const { query, setQuery, filteredItems } = useSearch(filteredElem, "codigo");
  const [tableMode, setTableMode] = useState(true);
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (
      Number(talla.substring(1, 3)) >= 19 &&
      Number(talla.substring(1, 3)) <= 32
    ) {
      setValue(1);
      // setfield('niños');
    }
  }, [talla]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // if (newValue === 1) {
    //   setfield('niños');
    // } else {
    //   setfield('todos');
    // }
  };
  const handleTableMode = (e) => {
    setTableMode(e.target.checked);
  };
  const csvData = [
    [
      "#",
      "codigo",
      "color",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "stock",
      "precio",
      user === "patrick" ? "costo" : "-",
    ],
  ];

  return (
    <div className={classes.root}>
      <Button
        style={{ fontSize: "2rem" }}
        onClick={() => {
          setTalla("");
          setColor("");
        }}
      >
        {almacen}
      </Button>
      <br />
      {(user === "patrick" || almacen === "Sopocachi") && (
        <FormControlLabel
          control={
            <Switch
              checked={tableMode}
              onChange={handleTableMode}
              inputProps={{ "aria-label": "Ver en una tabla" }}
            />
          }
          label="Ver en una tabla"
        />
      )}

      <ZapatoToolbar
        csvData={csvData}
        query={query}
        setQuery={setQuery}
        field={field}
        setfield={setfield}
        totalZapatos={getTotalOfShoes(filteredItems)}
        setColor={setColor}
        setTalla={setTalla}
        talla={talla}
      />
      <div className={classes.content}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Tienda" />
          <Tab label="Niños" />
        </Tabs>
        <TabPanel value={value} index={0}>
          {!tableMode ? (
            <ListCardViewProducts zapatos={filteredItems} />
          ) : (
            <ListZapatos zapatos={filteredItems} csvData={csvData} />
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {!tableMode ? (
            <ListCardViewProducts zapatos={filteredItems} />
          ) : (
            <ListZapatosChildren zapatos={filteredItems} csvData={csvData} />
          )}
        </TabPanel>
      </div>
    </div>
  );
};

export default WrapperZapatos;
