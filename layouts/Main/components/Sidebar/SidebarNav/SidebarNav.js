import React, { useState, useContext } from "react";
import AuthContext from "../../../../../context/auth/AuthContext";

import clsx from "clsx";
import {
  List,
  ListItem,
  colors,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Link from "next/link";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    display: "inherit",
    textDecoration: "none",
    color: colors.blueGrey[800],
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const SidebarNav = (props) => {
  const { pages, className, ...rest } = props;
  const [open, setOpen] = useState(false);
  const [openClientes, setOpenClientes] = useState(false);
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const handleClick = () => {
    setOpen(!open);
  };
  const classes = useStyles();
  return (
    <List {...rest} className={classes.root}>
      {user !== "elenap" &&
        pages.map((page) => (
          <ListItem className={classes.item} disableGutters key={page.title}>
            <div className={classes.icon}>{page.icon}</div>

            <Link href={page.href}>
              <a className={classes.button} activeclassname={classes.active}>
                {page.title}
              </a>
            </Link>
          </ListItem>
        ))}
      {user !== "elenap" && (
        <>
          <ListItem
            button
            className={classes.item}
            disableGutters
            onClick={() => setOpenClientes(!openClientes)}
          >
            <div className={classes.icon}>
              <AccountBoxIcon />
            </div>
            <ListItemText
              className={classes.button}
              activeclassname={classes.active}
              primary="Clientes"
              style={{ letterSpacing: 0, fontWeight: 500, fontFamily: null }}
            />
            {openClientes ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openClientes} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <Link href="/clientes/inti">
                  <a
                    className={classes.button}
                    activeclassname={classes.active}
                  >
                    <ListItemText primary="INTI" />
                  </a>
                </Link>
              </ListItem>
              <ListItem button className={classes.nested}>
                <Link href="/clientes/rtp">
                  <a
                    className={classes.button}
                    activeclassname={classes.active}
                  >
                    <ListItemText primary="RTP" />
                  </a>
                </Link>
              </ListItem>
            </List>
          </Collapse>
        </>
      )}

      <ListItem className={classes.item} disableGutters onClick={handleClick}>
        <div className={classes.icon}>
          <ShoppingBasket />
        </div>

        <ListItemText
          primary="Tiendas"
          style={{ letterSpacing: 0, fontWeight: 500, fontFamily: null }}
          className={classes.button}
          activeclassname={classes.active}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {user === "patrick" || user === "kathryn" || user === "fabio" ? (
            <ListItem button className={classes.nested}>
              <Link href="/productos/zapatos">
                <a className={classes.button} activeclassname={classes.active}>
                  <ListItemText primary="Todos los productos" />
                </a>
              </Link>
            </ListItem>
          ) : null}

          <ListItem button className={classes.nested}>
            <Link href="/productos/san-miguel">
              <a className={classes.button} activeclassname={classes.active}>
                <ListItemText primary="San Miguel" />
              </a>
            </Link>
          </ListItem>
          <ListItem button className={classes.nested}>
            <Link href="/productos/miraflores">
              <a className={classes.button} activeclassname={classes.active}>
                <ListItemText primary="Miraflores" />
              </a>
            </Link>
          </ListItem>
          <ListItem button className={classes.nested}>
            <Link href="/productos/sopocachi">
              <a className={classes.button} activeclassname={classes.active}>
                <ListItemText primary="Sopocachi" />
              </a>
            </Link>
          </ListItem>
          <ListItem button className={classes.nested}>
            <Link href="/productos/central">
              <a className={classes.button} activeclassname={classes.active}>
                <ListItemText primary="Central" />
              </a>
            </Link>
          </ListItem>
          <ListItem button className={classes.nested}>
            <Link href="/productos/cochabamba">
              <a className={classes.button} activeclassname={classes.active}>
                <ListItemText primary="Cochabamba" />
              </a>
            </Link>
          </ListItem>
          {user !== "elenap" &&
            user !== "ventascbba" &&
            user !== "ventaslapaz" && (
              <>
                <ListItem button className={classes.nested}>
                  <Link href="/productos/satelite">
                    <a
                      className={classes.button}
                      activeclassname={classes.active}
                    >
                      <ListItemText primary="Satelite" />
                    </a>
                  </Link>
                </ListItem>
                <ListItem button className={classes.nested}>
                  <Link href="/productos/comercial">
                    <a
                      className={classes.button}
                      activeclassname={classes.active}
                    >
                      <ListItemText primary="Comercial" />
                    </a>
                  </Link>
                </ListItem>
              </>
            )}
        </List>
      </Collapse>
    </List>
  );
};

export default SidebarNav;
