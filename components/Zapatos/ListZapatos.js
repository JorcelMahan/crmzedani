import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Zapato from './Zapato';
import { Card, CardContent } from '@material-ui/core';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
}));
const ListZapatos = (props) => {
  const { zapatos, csvData, className, ...rest } = props;
  const classes = useStyles();
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Codigo</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>27</TableCell>
                  <TableCell>28</TableCell>
                  <TableCell>29</TableCell>
                  <TableCell>30</TableCell>
                  <TableCell>31</TableCell>
                  <TableCell>32</TableCell>
                  <TableCell>33</TableCell>
                  <TableCell>34</TableCell>
                  <TableCell>35</TableCell>
                  <TableCell>36</TableCell>
                  <TableCell>37</TableCell>
                  <TableCell>38</TableCell>
                  <TableCell>39</TableCell>
                  <TableCell>40</TableCell>
                  <TableCell>41</TableCell>
                  <TableCell>42</TableCell>
                  <TableCell>43</TableCell>
                  <TableCell>44</TableCell>
                  <TableCell>45</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Editar</TableCell>
                  <TableCell>Vender</TableCell>
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
                  return (
                    <Zapato
                      key={zapato.id}
                      zapato={zapato}
                      i={index}
                      classes={classes}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

export default ListZapatos;
