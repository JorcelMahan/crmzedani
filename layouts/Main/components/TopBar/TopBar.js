import React, { useContext } from "react";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import InputIcon from "@material-ui/icons/Input";
import { makeStyles } from "@material-ui/styles";
import Link from "next/link";
import SalidaBadge from "../../../../components/Zapatos/SalidaBadge";
import CardBadge from "../../../../components/CardBadge";
import AuthContext from "../../../../context/auth/AuthContext";
const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  logoText: {
    color: "white",
    fontSize: "1.5rem",
  },
  defaultLink: {
    color: "white",
  },
}));
const TopBar = (props) => {
  const { className, onSidebarOpen, closeSession, ...rest } = props;
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        {user !== "elenap" ? (
          <>
            <Link href="/">
              <a className={classes.logoText}>ZEDANI</a>
            </Link>
            <div className={classes.flexGrow} />
            <Hidden>
              <Link href="/checkout">
                <a className={classes.defaultLink}>
                  <CardBadge />
                </a>
              </Link>
              <Link href="/salida-checkout">
                <a className={classes.defaultLink}>
                  <SalidaBadge />
                </a>
              </Link>
              <IconButton
                className={classes.signOutButton}
                color="inherit"
                onClick={closeSession}
              >
                <InputIcon />
              </IconButton>
            </Hidden>
          </>
        ) : (
          <>
            <Link href="/">
              <a className={classes.logoText}>ZEDANI</a>
            </Link>
            <div className={classes.flexGrow} />
            <Hidden>
              <IconButton
                className={classes.signOutButton}
                color="inherit"
                onClick={closeSession}
              >
                <InputIcon />
              </IconButton>
            </Hidden>
          </>
        )}

        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
