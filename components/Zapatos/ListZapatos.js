import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { fade, makeStyles } from '@material-ui/core/styles';
import Zapato from './Zapato';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 400,
  },
  containerMenu: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    border: '1px solid red',
    alignItems: 'center',
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
    marginTop: '0.8rem',
    border: '1px solid black',
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
const ListZapatos = ({ zapatos, csvData }) => {
  const classes = useStyles();
  return (
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
          {zapatos.map((zapato, index) => {
            csvData.push([
              ++index,
              zapato.codigo,
              zapato.color,
              zapato.tallas['t27'] ? zapato.tallas['t27'] : 0,
              zapato.tallas['t28'] ? zapato.tallas['t28'] : 0,
              zapato.tallas['t29'] ? zapato.tallas['t29'] : 0,
              zapato.tallas['t30'] ? zapato.tallas['t30'] : 0,
              zapato.tallas['t31'] ? zapato.tallas['t31'] : 0,
              zapato.tallas['t32'] ? zapato.tallas['t32'] : 0,
              zapato.tallas['t33'] ? zapato.tallas['t33'] : 0,
              zapato.tallas['t34'] ? zapato.tallas['t34'] : 0,
              zapato.tallas['t35'] ? zapato.tallas['t35'] : 0,
              zapato.tallas['t36'] ? zapato.tallas['t36'] : 0,
              zapato.tallas['t37'] ? zapato.tallas['t37'] : 0,
              zapato.tallas['t38'] ? zapato.tallas['t38'] : 0,
              zapato.tallas['t39'] ? zapato.tallas['t39'] : 0,
              zapato.tallas['t40'] ? zapato.tallas['t40'] : 0,
              zapato.tallas['t41'] ? zapato.tallas['t41'] : 0,
              zapato.tallas['t42'] ? zapato.tallas['t42'] : 0,
              zapato.tallas['t43'] ? zapato.tallas['t43'] : 0,
              zapato.tallas['t44'] ? zapato.tallas['t44'] : 0,
              zapato.tallas['t45'] ? zapato.tallas['t45'] : 0,
              zapato.stock,
            ]);
            return <Zapato key={zapato.id} zapato={zapato} i={index} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListZapatos;
