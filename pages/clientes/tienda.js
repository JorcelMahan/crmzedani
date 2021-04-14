import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Input, Paper, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  paper: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
  },
  content: {
    marginTop: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px',
  },
}));

const tienda = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography>Clientes</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <SearchIcon className={classes.icon} />
              <Input
                type='text'
                className={classes.input}
                disableUnderline
                placeholder='NIT o CI'
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default tienda;
