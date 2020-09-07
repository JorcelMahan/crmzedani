import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation, gql } from '@apollo/client';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { Collapse } from '@material-ui/core';
import ProductItem from './ProductItem';

const RETURN_SALIDA = gql`
  mutation returnSalida($id: ID!) {
    returnSalida(id: $id)
  }
`;

const TRANSFER_SALIDA = gql`
  mutation transferSalida($id: ID!, $almacen: String!) {
    transferSalida(id: $id, almacen: $almacen)
  }
`;
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  boxActions: {
    marginTop: '8px',
    display: 'flex',
    flexDirection: 'column',
  },
  box: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgDisabled: {
    backgroundColor: '#ffcdd2',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));
const CardSalida = ({ salida }) => {
  const classes = useStyles();
  const formateDate = new Date(Number(salida.fechaSalida));
  const [expanded, setExpanded] = useState(false);
  const [returnSalida] = useMutation(RETURN_SALIDA);
  const [transferSalida] = useMutation(TRANSFER_SALIDA);
  const [isReturn, setIsReturn] = useState(false);
  const [isTransfer, setIsTransfer] = useState(false);
  let almacenes = [
    'sopocachi',
    'san-miguel',
    'satelite',
    'miraflores',
    'llojeta',
  ];
  almacenes = almacenes.filter((almacen) => almacen !== salida.almacen);
  const [selectedAlmacen, setSelectedAlmacen] = useState('');
  useEffect(() => {}, [salida.status]);
  const handleReturnSalida = async () => {
    setIsReturn(true);
    try {
      await returnSalida({
        variables: {
          id: salida.id,
        },
      });
    } catch (e) {
      console.log('Yo error', e);
    }
  };
  const handleTransfer = async () => {
    try {
      await transferSalida({
        variables: {
          id: salida.id,
          almacen: selectedAlmacen,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={`${salida.status ? classes.bgDisabled : ''}`}>
      <CardHeader
        title={`Salida: ${salida.almacen.toUpperCase()}`}
        subheader={`${formateDate.toLocaleDateString('es-MX')}`}
      />
      <CardActions disableSpacing>
        <p>Retirado por: {salida.retiradoPor}</p>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </IconButton>
        <p>{salida.codigo}</p>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <List>
            {salida.products.map((product, index) => (
              <ProductItem key={`${product.id}-${index}`} product={product} />
            ))}
          </List>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p>Total: {salida.totalProducts}</p>
          </div>

          <div className={classes.boxActions}>
            <Fade
              in={isReturn}
              style={{
                transitionDelay: isReturn ? '800ms' : '0ms',
              }}
              unmountOnExit
            >
              <CircularProgress />
            </Fade>
            <Button
              onClick={handleReturnSalida}
              disabled={salida.status}
              variant='contained'
              color='primary'
              size='small'
            >
              Devolver
            </Button>
            <div className={classes.box}>
              <FormControl
                className={classes.formControl}
                disabled={salida.status}
              >
                <InputLabel id='lbl-almacen'>
                  {!salida.hasOwnProperty('retiradoHacia')
                    ? salida.retiradoHacia
                    : 'Almacen'}
                </InputLabel>
                <Select
                  labelId='lbl-almacen'
                  id='almacen'
                  value={selectedAlmacen}
                  onChange={(e) => setSelectedAlmacen(e.target.value)}
                >
                  {almacenes.map((almacen) => (
                    <MenuItem key={almacen} value={almacen}>
                      {almacen}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Fade>
                <CircularProgress />
              </Fade>
              <Button
                disabled={salida.status}
                onClick={handleTransfer}
                variant='contained'
                color='secondary'
                size='small'
              >
                Transferir
              </Button>
            </div>
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CardSalida;
