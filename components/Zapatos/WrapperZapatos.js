<<<<<<< HEAD
=======

>>>>>>> a8cb47691d5c8ea8035f8dd737a699e573e33f7a
import React, {useEffect} from "react";
import ListZapatos from './ListZapatos';
import ZapatoToolbar from './ZapatoToolbar';
import {makeStyles} from '@material-ui/core/styles';
import {useSearch, useFilterBy} from '../../hooks/useSearch';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },

    content: {
        marginTop: theme.spacing(2),
    },
}));

const getTotalOfShoes = shoes => {
    let total = 0;
    shoes.forEach(shoe => total += shoe.stock);
    return total;
}
const WrapperZapatos = ({zapatos}) => {
    const classes = useStyles();
    const {field, setfield, filteredElem} = useFilterBy(
        zapatos,
        'tipo',
        'todos'
    );
    const {query, setQuery, filteredItems} = useSearch(filteredElem, 'codigo');

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
    // useEffect(() => {
    //     setTotalZapatos(Object.values(zapatos.tallas).reduce((acc, curr) => acc + curr, 0))
    // }, [])
    return (
        <div className={classes.root}>
            <ZapatoToolbar
                csvData={csvData}
                query={query}
                setQuery={setQuery}
                field={field}
                setfield={setfield}
                totalZapatos={getTotalOfShoes(zapatos)}
            />
            <div className={classes.content}>
                <ListZapatos zapatos={filteredItems} csvData={csvData}/>
            </div>
        </div>
    );
};

export default WrapperZapatos;
