
import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {Button} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import SearchInput from '../SearchInput/SearchInput';
import {CSVLink, CSVDownload} from 'react-csv';
import Link from 'next/link';

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
<<<<<<< HEAD
    },
    exportButton: {
        marginRight: theme.spacing(1),
        backgroundColor: '#21A464',
        '&:hover': {
            backgroundColor: '#21A414',
        },
    },
=======
    },
    exportButton: {
        marginRight: theme.spacing(1),
        backgroundColor: '#21A464',
        '&:hover': {
            backgroundColor: '#21A414',
        },
    },
>>>>>>> a8cb47691d5c8ea8035f8dd737a699e573e33f7a
    searchInput: {
        marginRight: theme.spacing(1),
    },
    csvLink: {
        textDecoration: 'none',
        color: 'white',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    total: {
        justifySelf: 'flex-end',
        alignSelf: 'flex-end',
        marginLeft: 'auto'
    }
}));

const ZapatoToolbar = (props) => {
    const {
        className,
        setQuery,
        query,
        csvData,
        field,
        setfield,
        totalZapatos,
        ...rest
    } = props;

    const classes = useStyles();

    return (
        <div {...rest} className={clsx(classes.root, className)}>
            <div className={classes.row}>
                <span className={classes.spacer}/>
                <FormControl className={classes.formControl}>
                    <InputLabel id='tipo'>Tipo</InputLabel>
                    <Select
                        labelId='tipo'
                        value={field}
                        onChange={(e) => setfield(e.target.value)}
                    >
                        <MenuItem value='todos'>Todos</MenuItem>
                        <MenuItem value='hombre'>Hombre</MenuItem>
                        <MenuItem value='mujer'>Dama</MenuItem>
                        <MenuItem value='seguridad'>Seguridad</MenuItem>
                    </Select>
                </FormControl>

                <Button className={classes.exportButton}>
                    <CSVLink
                        data={csvData}
                        filename='inventario.csv'
                        className={classes.csvLink}
                    >
                        Exportar
                    </CSVLink>
                </Button>
                <Link href='/new-zapato'>
                    <Button color='primary' variant='contained'>
                        Add Zapato
                    </Button>
                </Link>
            </div>
            <div className={classes.row}>
                <SearchInput
                    className={classes.searchInput}
                    placeholder='Buscar zapato'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <p className={classes.total}>Stock: <b>{totalZapatos}</b></p>
            </div>
        </div>
    );
};

export default ZapatoToolbar;
