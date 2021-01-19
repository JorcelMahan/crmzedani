import React, { useState, useContext } from 'react';
import AuthContext from '../../../../../context/auth/AuthContext';

import clsx from 'clsx';
import {
  List,
  ListItem,
  colors,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Link from 'next/link';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    display: 'inherit',
    textDecoration: 'none',
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium,
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
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
    
      {user !== 'elenap' && pages.map((page) => (
        <ListItem className={classes.item} disableGutters key={page.title}>
          <Link href={page.href}>
            <a className={classes.button} activeclassname={classes.active}>
              <div className={classes.icon}>{page.icon}</div>
              {page.title}
            </a>
          </Link>
        </ListItem>
      ))}
      {
        user !== 'elenap' && (
          <>
          <ListItem
        className={classes.item}
        disableGutters
        onClick={() => setOpenClientes(!openClientes)}
        style={{ marginLeft: '8px' }}>
        <div className={classes.icon}>
          <AccountBoxIcon />
        </div>
        <ListItemText
          primary='Clientes'
          style={{ letterSpacing: 0, fontWeight: 500, fontFamily: null }}
        />
        {openClientes ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openClientes} timeout='auto' unmountOnExit>
        <ListItem button className={classes.nested}>
          <Link href='/clientes/inti'>
            <a>
              <ListItemText primary='INTI' />
            </a>
          </Link>
        </ListItem>
        <ListItem button className={classes.nested}>
          <Link href='/clientes/rtp'>
            <a>
              <ListItemText primary='RTP' />
            </a>
          </Link>
        </ListItem>
      </Collapse>
      </>
        )
      }
      
      <ListItem
        className={classes.item}
        disableGutters
        onClick={handleClick}
        style={{ marginLeft: '8px' }}>
        <div className={classes.icon}>
          <ShoppingBasket />
        </div>

        <ListItemText
          primary='Tiendas'
          style={{ letterSpacing: 0, fontWeight: 500, fontFamily: null }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {user === 'patrick' || user === 'kathryn' || user === 'fabio' ? (
            <ListItem button className={classes.nested}>
              <Link href='/productos/zapatos'>
                <a>
                  <ListItemText primary='Todos los productos' />
                </a>
              </Link>
            </ListItem>
          ) : null}

          <ListItem button className={classes.nested}>
            <Link href='/productos/san-miguel'>
              <a>
                <ListItemText primary='San Miguel' />
              </a>
            </Link>
          </ListItem>
          <ListItem button className={classes.nested}>
            <Link href='/productos/miraflores'>
              <a>
                <ListItemText primary='Miraflores' />
              </a>
            </Link>
          </ListItem>
          <ListItem button className={classes.nested}>
            <Link href='/productos/sopocachi'>
              <a>
                <ListItemText primary='Sopocachi' />
              </a>
            </Link>
          </ListItem>
          <ListItem button className={classes.nested}>
            <Link href='/productos/satelite'>
              <a>
                <ListItemText primary='Satelite' />
              </a>
            </Link>
          </ListItem>
          <ListItem button className={classes.nested}>
            <Link href='/productos/davidtnt'>
              <a>
                <ListItemText primary='David TNT' />
              </a>
            </Link>
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
};

export default SidebarNav;
