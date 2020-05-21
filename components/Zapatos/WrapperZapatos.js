import ListZapatos from './ListZapatos';
import ZapatoToolbar from './ZapatoToolbar';
import { makeStyles } from '@material-ui/core/styles';
import { useSearch, useFilterBy } from '../../hooks/useSearch';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },

  content: {
    marginTop: theme.spacing(2),
  },
}));

const WrapperZapatos = ({ zapatos }) => {
  const classes = useStyles();
  const { field, setfield, filteredElem } = useFilterBy(
    zapatos,
    'tipo',
    'todos'
  );
  const { query, setQuery, filteredItems } = useSearch(filteredElem, 'codigo');

  const csvData = [
    [
      '#',
      'codigo',
      'color',
      '27',
      '28',
      '29',
      '30',
      '31',
      '32',
      '33',
      '34',
      '35',
      '36',
      '37',
      '38',
      '39',
      '40',
      '41',
      '42',
      '43',
      '44',
      '45',
      'stock',
    ],
  ];

  return (
    <div className={classes.root}>
      <ZapatoToolbar
        csvData={csvData}
        query={query}
        setQuery={setQuery}
        field={field}
        setfield={setfield}
      />
      <div className={classes.content}>
        <ListZapatos zapatos={filteredItems} csvData={csvData} />
      </div>
    </div>
  );
};

export default WrapperZapatos;
