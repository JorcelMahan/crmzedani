import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, gql } from '@apollo/client';
import PromotorasToolbar from '../components/Promotoras/PromotorasToolbar';
import PromotoraTable from '../components/Promotoras/PromotoraTable';
import { useSearch } from '../hooks/useSearch';
import Loader from '../components/Loader';

const GET_PROMOTORAS = gql`
  query promotorasHabilitadas {
    promotorasHabilitadas {
      id
      nombres
      apellidos
      razonSocial
      nit
      habilitada
      celular
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

const WrapperPromotoras = ({ promotoras }) => {
  const classes = useStyles();
  const { query, setQuery, filteredItems } = useSearch(promotoras, 'nombres');

  return (
    <div className={classes.root}>
      <PromotorasToolbar query={query} setQuery={setQuery} />
      <div className={classes.content}>
        <PromotoraTable promotoras={filteredItems} />
      </div>
    </div>
  );
};

function promotoras() {
  const { loading, error, data } = useQuery(GET_PROMOTORAS);
  if (loading) return <Loader />;
  if (error) return `Error ${error.message}`;
  return <WrapperPromotoras promotoras={data.promotorasHabilitadas} />;
}

export default promotoras;
