import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import SearchInput from '../SearchInput/SearchInput';
import { CSVLink, CSVDownload } from 'react-csv';

const useStyles = makeStyles((theme) => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  exportButton: {
    marginRight: theme.spacing(1),
    backgroundColor: '#21A464',
    '&:hover': {
      backgroundColor: '#21A414',
    },
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
  csvLink: {
    textDecoration: 'none',
    color: 'white',
  },
}));

const ZapatoToolbar = (props) => {
  const { className, setQuery, query, csvData, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.exportButton}>
          <CSVLink
            data={csvData}
            filename='inventario.csv'
            className={classes.csvLink}
          >
            Exportar
          </CSVLink>
        </Button>
        <Button color='primary' variant='contained'>
          Add product
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder='Buscar zapato'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ZapatoToolbar;
