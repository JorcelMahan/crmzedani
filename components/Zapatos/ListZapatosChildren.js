import React, { useContext, useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Zapato from './Zapato';
import { Card, CardContent } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AuthContext from '../../context/auth/AuthContext';
import { useRouter } from 'next/router';

const useStyles = makeStyles(() => ({
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  table: {
    minWidth: 500,
  },
  footer: {
    width: '100%',
  },
}));

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));
// table custom pagination
const TablePaginationActions = (props) => {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

const ListZapatosChildren = (props) => {
  const { zapatos, csvData, className, ...rest } = props;
  const router = useRouter();
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  if (zapatos.length > 0) {
    zapatos.map((zapato) => {
      csvData.push([
        // ++index,
        zapato.almacen,
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
        zapato.tallas['t46'] ? zapato.tallas['t46'] : 0,
        zapato.stock,
      ]);
    });
  }
  // var for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    setTimeout(() => {
      setPage(0);
      setLoading(false);
    }, 1000);
  }, [zapatos]);
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      {loading && <p>...</p>}
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table
              className={classes.table}
              stickyHeader
              aria-label='sticky table'
            >
              <TableHead>
                <TableRow>
                  {(user === 'patrick' || user === 'kathryn') &&
                  router.pathname.split('/')[2] === 'zapatos' ? (
                    <TableCell>Tienda </TableCell>
                  ) : (
                    <TableCell>#</TableCell>
                  )}

                  <TableCell>Image</TableCell>
                  <TableCell>Codigo</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>19</TableCell>
                  <TableCell>20</TableCell>
                  <TableCell>21</TableCell>
                  <TableCell>22</TableCell>
                  <TableCell>23</TableCell>
                  <TableCell>24</TableCell>
                  <TableCell>25</TableCell>
                  <TableCell>26</TableCell>
                  <TableCell>27</TableCell>
                  <TableCell>28</TableCell>
                  <TableCell>29</TableCell>
                  <TableCell>30</TableCell>
                  <TableCell>31</TableCell>
                  <TableCell>32</TableCell>
                  <TableCell>Stock</TableCell>

                  {user === 'patrick' && <TableCell>Editar</TableCell>}
                  {(user === router.pathname.substr(11).replace('-', ' ') ||
                    user === 'patrick') && <TableCell>Vender</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? zapatos.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : zapatos
                ).map((zapato, index) => {
                  return (
                    <Zapato
                      key={zapato.id}
                      zapato={zapato}
                      i={index}
                      classes={classes}
                      children={true}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
        <TablePagination
          component='div'
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          colSpan={3}
          count={zapatos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </CardContent>
    </Card>
  );
};

export default ListZapatosChildren;