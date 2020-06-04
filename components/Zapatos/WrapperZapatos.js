import React, {useState} from "react";
import ListZapatos from './ListZapatos';
import ZapatoToolbar from './ZapatoToolbar';
import {makeStyles} from '@material-ui/core/styles';
import {useSearch, useFilterBy} from '../../hooks/useSearch';
import ListCardViewProducts from "./ListCardViewProducts";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";


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
const WrapperZapatos = ({zapatos, almacen}) => {
    const classes = useStyles();
    const {field, setfield, filteredElem} = useFilterBy(
        zapatos,
        'tipo',
        'todos'
    );
    const {query, setQuery, filteredItems} = useSearch(filteredElem, 'codigo');
    const [tableMode, setTableMode] = useState(false);
    const handleTableMode = e => {
        setTableMode(e.target.checked)
    }
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
            <h2>{almacen}</h2>
            <FormControlLabel
                control={ <Switch
                    checked={tableMode}
                    onChange={handleTableMode}
                    inputProps={{'aria-label': 'Ver en una tabla'}}
                />}
                label="Ver en una tabla"
            />
            <ZapatoToolbar
                csvData={csvData}
                query={query}
                setQuery={setQuery}
                field={field}
                setfield={setfield}
                totalZapatos={getTotalOfShoes(zapatos)}
            />
            <div className={classes.content}>
                {
                    !tableMode ? <ListCardViewProducts zapatos={filteredItems}/> :
                        <ListZapatos zapatos={filteredItems} csvData={csvData}/>
                }
            </div>
        </div>
    );
};

export default WrapperZapatos;
