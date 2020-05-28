
import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Link from 'next/link';
import SearchInput from '../SearchInput/SearchInput';
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
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
}));
const PromotorasToolbar = (props) => {
  const { className, query, setQuery, ...rest } = props;
  const classes = useStyles();
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer}></span>
        <Button className={classes.exportButton}>Export</Button>
        <Link href='/newpromotora'>
          <Button color='primary' variant='contained'>
            Inscribir Promotora
          </Button>
        </Link>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder='Buscar promotora'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PromotorasToolbar;
