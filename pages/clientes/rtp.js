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
import { useSearchMore } from '../../hooks/useSearch';

const GET_RTP = gql`
  query rtp {
    rtp {
      nro
      ci
      paterno
      materno
      nombre
      creditoAutorizadoTresMeses
      cuotaMaximaMensual
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

const RtpCell = ({ rtp }) => {
  const { query, setQuery, filteredItems } = useSearchMore(
    rtp,
    'nombre',
    'paterno',
    'materno'
  );
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
            <TableCell>Nro</TableCell>
            <TableCell>CI</TableCell>
            <TableCell>Paterno</TableCell>
            <TableCell>Materno</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Creditado Autorizado 3 meses</TableCell>
            <TableCell>Cuota Maxima Mensual</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredItems.map((p) => (
            <TableRow key={p.id} hover>
              <TableCell>{p.nro} </TableCell>
              <TableCell>{p.ci}</TableCell>
              <TableCell>{p.paterno}</TableCell>
              <TableCell>{p.materno}</TableCell>
              <TableCell>{p.nombre}</TableCell>
              <TableCell>{p.creditoAutorizadoTresMeses}</TableCell>
              <TableCell>{p.cuotaMaximaMensual}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
const Rtp = () => {
  const { loading, error, data } = useQuery(GET_RTP);
  const classes = useStyles();
  if (loading) return <Loader />;
  if (error) return `Error ${error.message}`;
  const { rtp } = data;
  return (
    <div className={classes.root}>
      <h3>Personal de RTP</h3>
      <RtpCell rtp={rtp} />
    </div>
  );
};

export default Rtp;
