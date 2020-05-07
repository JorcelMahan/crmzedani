import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { List, ListItem, Button, colors } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Link from 'next/link';

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
}));

const CustomRouterLink = forwardRef((props, ref) => {
  const classes = useStyles();
  return (
    <div ref={ref} style={{ flexGrow: 1 }}>
      <Link href={props.href}>
        <a>
          <div className={classes.icon}>{props.icon}</div>
          {/* {props.title} */}
        </a>
      </Link>
    </div>
  );
});
const SidebarNav = (props) => {
  const { pages, className, ...rest } = props;

  const classes = useStyles();
  return (
    <List {...rest} className={clsx(classes.root, className)}>
      {pages.map((page) => (
        <ListItem className={classes.item} disableGutters key={page.title}>
          <Link href={page.href}>
            <a className={classes.button} activeclassname={classes.active}>
              <div className={classes.icon}>{page.icon}</div>
              {page.title}
            </a>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarNav;
// <Link href={page.href}>
//   <a className={classes.button} activeclassname={classes.active}>
//     <div className={classes.icon}>{page.icon}</div>
//     {page.title}
//   </a>
// </Link>;
