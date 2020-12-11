import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Loader from '../../components/Loader';
import SearchInput from '../../components/SearchInput/SearchInput';
import { makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useSearch } from '../../hooks/useSearch';

const GET_INTI = gql`
  query inti {
    inti {
      id
      CODIGO
      NOMBRE
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },

  content: {
    marginTop: theme.spacing(2),
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  table: {
    minWidth: 500,
    marginTop: '1rem',
  },
}));

const IntiCell = ({ inti }) => {
  const { query, setQuery, filteredItems } = useSearch(inti, 'NOMBRE');
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <div className={classes.row}>
        <SearchInput
          placeholder='Buscar'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Table className={classes.table} stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>
            <TableCell>Codigo</TableCell>
            <TableCell>Nombre</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredItems.map((p) => (
            <TableRow key={p.id} hover>
              <TableCell>{p.CODIGO} </TableCell>
              <TableCell>{p.NOMBRE}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
const Inti = () => {
  const { loading, error, data } = useQuery(GET_INTI);
  const classes = useStyles();
  if (loading) return <Loader />;
  if (error) return `Error ${error.message}`;
  const { inti } = data;
  return (
    <div className={classes.root}>
      <h3>Personal de INTI</h3>
      <IntiCell inti={inti} />
    </div>
  );
};

export default Inti;
