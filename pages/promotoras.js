import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, gql } from '@apollo/client';
import Router from 'next/router';
import PromotorasToolbar from '../components/Promotoras/PromotorasToolbar';
import PromotoraTable from '../components/Promotoras/PromotoraTable';
const GET_PROMOTORAS = gql`
  {
    promotoras {
      id
      nombres
      apellidos
      razonSocial
      nit
      habilitada
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

const editPromotora = (id) => {
  Router.push({
    pathname: '/editPromotora/[id]',
    query: {
      id,
    },
  });
};

export default function SimpleTable() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_PROMOTORAS);
  if (loading) return 'loading...';
  if (error) return 'error...';
  return (
    <div className={classes.root}>
      <PromotorasToolbar />
      <div className={classes.content}>
        <PromotoraTable promotoras={data.promotoras} />
      </div>
    </div>
  );
}
