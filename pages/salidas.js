import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, gql } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import CardSalida from '../components/Salidas/CardSalida';
import Loader from '../components/Loader';
// import Link from 'next/link';
import { useRouter } from 'next/router';

const GET_SALIDAS = gql`
  query salidasByDate($date: String!) {
    salidasByDate(date: $date) {
      id
      codigo
      products {
        id
        codigo
        color
        sizeSale
        quantity
        image
      }
      totalProducts
      almacen
      retiradoPor
      retiradoHacia
      fechaSalida
      status
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
}));

const Salidas = () => {
  const classes = useStyles();
  const router = useRouter();
  const currentDate = new Date()
    .toLocaleString('es-MX', {
      year: 'numeric',
      month: 'numeric',
      day: '2-digit',
    })
    .split('/');
  const currDateStr = `${currentDate[2]}-${currentDate[1]}-${currentDate[0]}`;
  const [initialDate, setDate] = useState(currDateStr);
  const [salidasDate, setSalidasDate] = useState([]);
  //calendar
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_SALIDAS,
    {
      variables: {
        date: initialDate,
      },
    }
  );
  useEffect(() => {
    if (data) {
      setSalidasDate(data.salidasByDate);
    }
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [data, startPolling, stopPolling]);
  if (loading) return <Loader />;
  if (error) return `Error: ${error.message}`;

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <h2>Salidas</h2>
        <div>
          Fecha:
          <input
            type='date'
            value={initialDate}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <Grid container spacing={1} wrap='wrap'>
          {salidasDate.length > 0 ? (
            salidasDate.map((salida) => (
              <Grid key={salida.id} item xs={12} sm={6} md={3}>
                {/* <a
                  onClick={() => {
                    router.push({
                      pathname: '/salidas/[id]',
                      query: { id: salida.id },
                    });
                  }}></a> */}
                <CardSalida salida={salida} />
              </Grid>
            ))
          ) : (
            <p>No hay ninguna salida</p>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default Salidas;
