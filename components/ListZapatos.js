import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';

import Zapato from '../components/Zapato';
import { useSearch } from '../hooks/useSearch';
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 400,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const ListZapatos = ({ zapatos }) => {
  const classes = useStyles();

  const { query, setQuery, filteredItems } = useSearch(zapatos);

  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder='Buscar zapato'
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align='right'>Image</TableCell>
              <TableCell align='right'>Codigo</TableCell>
              <TableCell align='right'>Color</TableCell>
              <TableCell align='right'>27</TableCell>
              <TableCell align='right'>28</TableCell>
              <TableCell align='right'>29</TableCell>
              <TableCell align='right'>30</TableCell>
              <TableCell align='right'>31</TableCell>
              <TableCell align='right'>32</TableCell>
              <TableCell align='right'>33</TableCell>
              <TableCell align='right'>34</TableCell>
              <TableCell align='right'>35</TableCell>
              <TableCell align='right'>36</TableCell>
              <TableCell align='right'>37</TableCell>
              <TableCell align='right'>38</TableCell>
              <TableCell align='right'>39</TableCell>
              <TableCell align='right'>40</TableCell>
              <TableCell align='right'>41</TableCell>
              <TableCell align='right'>42</TableCell>
              <TableCell align='right'>43</TableCell>
              <TableCell align='right'>44</TableCell>
              <TableCell align='right'>45</TableCell>
              <TableCell align='right'>Stock</TableCell>
              <TableCell align='right'>Editar</TableCell>
              <TableCell align='right'>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((zapato, index) => (
              <Zapato key={zapato.id} zapato={zapato} i={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListZapatos;
