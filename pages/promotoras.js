import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, gql } from '@apollo/client';
import Router from 'next/router';
import PromotorasToolbar from '../components/Promotoras/PromotorasToolbar';
import PromotoraTable from '../components/Promotoras/PromotoraTable';
import { useSearch } from '../hooks/useSearch';

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
  if (loading) return 'loading...';
  if (error) return 'error...';
  const { promotoras } = data;
  return <WrapperPromotoras promotoras={promotoras} />;
}
export default promotoras;
