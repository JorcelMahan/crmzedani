import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { useFormik } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useMutation, gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Alert from '@material-ui/lab/Alert';
import ModalAddColor from '../components/Zapatos/ModalAddColor';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Snackbar } from '@material-ui/core';

const ADD_ZAPATO = gql`
  mutation addZapato($input: ZapatoInput) {
    addZapato(input: $input)
  }
`;

const GET_COLORS = gql`
  query colors {
    colors {
      id
      nombre
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    padding: '1rem',
    '& .MuiTextField-root': {
      fontSize: '1rem',
    },
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  paper: {
    margin: 'auto',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  formControl: {
    margin: theme.spacing(1),
    width: '30%',
  },

  groupPlus: {
    display: 'flex',
    alignItems: 'center',
    width: '30%',
    padding: 0,
  },
}));

const marcas = ['zedani', 'sandder', 'sandder tnt', 'rebeca', 'maritza'];
const descuentosPromotora = [5, 10, 15, 18, 20, 22, 25, 30, 35, 40, 45, 50];
const NewZapato = () => {
  const classes = useStyles();
  const router = useRouter();
  const [image, setImage] = useState(
    'https://www.vippng.com/png/detail/7-76841_shoe-icon-shoes-png.png'
  );
  const [msg, setMsg] = useState(null);
  const showMsg = () => <Alert severity='error'> {msg}</Alert>;
  // form message
  const [open, setOpen] = useState(false);
  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [addZapato, { loading, error }] = useMutation(ADD_ZAPATO);
  const [colors, setColors] = useState([]);
  const { loading: loading2, error: error2, data } = useQuery(GET_COLORS);
  const formik = useFormik({
    initialValues: {
      codigo: '',
      color: '',
      catalogo: '',
      marca: '',
      tipo: '',
      costo: 0,
      descuentoPromotora: '',
      precioPublico: '',
      almacen: 'satelite',
      tallas: {
        t19: 0,
        t20: 0,
        t21: 0,
        t22: 0,
        t23: 0,
        t24: 0,
        t25: 0,
        t26: 0,
        t27: 0,
        t28: 0,
        t29: 0,
        t30: 0,
        t31: 0,
        t32: 0,
        t33: 0,
        t34: 0,
        t35: 0,
        t36: 0,
        t37: 0,
        t38: 0,
        t39: 0,
        t40: 0,
        t41: 0,
        t42: 0,
        t43: 0,
        t44: 0,
        t45: 0,
        t46: 0,
      },
    },
    onSubmit: async (values, { resetForm }) => {
      const {
        codigo,
        color,
        almacen,
        descuentoPromotora,
        catalogo,
        costo,
        marca,
        precioPublico,
        tallas,
        tipo,
      } = values;

      try {
        await addZapato({
          variables: {
            input: {
              codigo,
              color,
              tallas,
              costo: Number(costo),
              descuentoPromotora: Number(descuentoPromotora),
              catalogo,
              marca,
              tipo,
              image,
              almacen,
              precioPublico: Number(precioPublico),
              precioPromocion: 0,
              precioPromotora: Math.round(
                precioPublico -
                (precioPublico * Number(descuentoPromotora)) / 100
              ),
            },
          },
        });
        setOpen(true);
        resetForm();
        // reset
        // await router.push(`/productos/${almacen}`);
      } catch (error) {
        console.log(error);
        setMsg(error.message.replace('Error:', ''));
        setTimeout(() => {
          setMsg(null);
        }, 5000);
      }
    },
  });
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('upload_preset', 'zd-products');
    formData.append('file', file);
    const cloudURL = 'https://api.cloudinary.com/v1_1/zedani/upload';
    try {
      const resp = await fetch(cloudURL, {
        method: 'POST',
        body: formData,
      });
      if (resp.ok) {
        const cloudRes = await resp.json();
        setImage(cloudRes.secure_url);
      } else {
        throw await resp.json();
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (data) {
      setColors(data.colors);
    }
  }, [data]);
  if (loading2) return 'Loading';
  if (error2) return `${error}`;
  return (
    <Grid container spacing={2} style={{ padding: '2rem' }}>
      <Grid item xs={12}>
        <Typography variant='h2'>Crear Nuevo Producto</Typography>
      </Grid>
      {open && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='success'>
            Producto creado con exito
          </Alert>
        </Snackbar>
      )}
      <Grid item xs={12}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id='codigo'
                      label='Codigo'
                      required
                      value={formik.values.codigo}
                      onChange={formik.handleChange}
                      variant='outlined'
                    />
                  </FormControl>
                  <div className={classes.groupPlus}>
                    <FormControl
                      className={classes.formControl}
                      variant='outlined'
                      style={{ flexGrow: 1 }}>
                      <InputLabel htmlFor='color'>Color</InputLabel>
                      <Select
                        native
                        required
                        inputProps={{
                          id: 'color',
                          name: 'color',
                        }}
                        value={formik.values.color}
                        onChange={formik.handleChange}>
                        <option aria-label='None' value='' />
                        {colors.map((color) => (
                          <option key={color.id} value={color.name}>
                            {color.nombre}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <ModalAddColor />
                  </div>

                  <FormControl className={classes.formControl}>
                    <TextField
                      id='catalogo'
                      label='Catalogo'
                      value={formik.values.catalogo}
                      onChange={formik.handleChange}
                      variant='outlined'
                    />
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    variant='outlined'>
                    <InputLabel id='marca'>Marca</InputLabel>
                    <Select
                      id='marca'
                      name='marca'
                      labelId='marca'
                      required
                      value={formik.values.marca}
                      onChange={formik.handleChange}>
                      {marcas.map((e) => (
                        <MenuItem key={e} value={e}>
                          {e}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    variant='outlined'>
                    <InputLabel id='tipo'>Tipo</InputLabel>
                    <Select
                      id='tipo'
                      name='tipo'
                      labelId='tipo'
                      required
                      value={formik.values.tipo}
                      onChange={formik.handleChange}>
                      {[
                        'hombre',
                        'mujer',
                        'seguridad',
                        'niños',
                        'escolar',
                        'enfermera',
                        'accesorios',
                        'marroquineria',
                      ].map((e) => (
                        <MenuItem key={e} value={e}>
                          {e}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    variant='outlined'>
                    <InputLabel id='almacen'>Almacen</InputLabel>
                    <Select
                      id='almacen'
                      name='almacen'
                      labelId='almacen'
                      required
                      value={formik.values.almacen}
                      onChange={formik.handleChange}>
                      {[
                        'sopocachi',
                        'san-miguel',
                        'miraflores',
                        'central',
                        '6-de-marzo',
                        'cochabamba',
                        'comercial-La-Paz',
                        'comercial-Cochabamba',
                        'satelite',
                        'muestras',
                        'fallas'
                      ].map((e) => (
                        <MenuItem key={e} value={e}>
                          {e}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id='costo'
                      label='Costo'
                      value={formik.values.costo}
                      onChange={formik.handleChange}
                      variant='outlined'
                    />
                  </FormControl>

                  <FormControl
                    className={classes.formControl}
                    variant='outlined'>
                    <InputLabel id='descuentoPromotora'>
                      Descuento Promotora
                    </InputLabel>
                    <Select
                      id='descuentoPromotora'
                      name='descuentoPromotora'
                      labelId='descuentoPromotora'
                      required
                      value={formik.values.descuentoPromotora}
                      onChange={formik.handleChange}>
                      {descuentosPromotora.map((e) => (
                        <MenuItem key={e} value={e}>
                          {e}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <TextField
                      id='precioPublico'
                      label='Precio publico'
                      required
                      value={formik.values.precioPublico}
                      onChange={formik.handleChange}
                      variant='outlined'
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <span>
                      Precio Promotora:
                      {Math.round(
                        formik.values.precioPublico -
                        (formik.values.precioPublico *
                          Number(formik.values.descuentoPromotora)) /
                        100
                      )}
                    </span>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    Utilidad:{' '}
                    {Math.round(
                      (formik.values.precioPublico -
                        formik.values.costo +
                        Number.EPSILON) *
                      100
                    ) / 100}
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  {formik.values.tipo === 'hombre' &&
                    ['t38', 't39', 't40', 't41', 't42', 't43', 't44'].map(
                      (el) => (
                        <FormControl className={classes.formControl} key={el}>
                          <TextField
                            id={`tallas[${el}]`}
                            label={el}
                            type='number'
                            value={formik.values.tallas[el]}
                            onChange={formik.handleChange}
                            variant='outlined'
                          />
                        </FormControl>
                      )
                    )}
                  {formik.values.tipo === 'mujer' &&
                    ['t35', 't36', 't37', 't38', 't39'].map((el) => (
                      <FormControl className={classes.formControl} key={el}>
                        <TextField
                          id={`tallas[${el}]`}
                          label={el}
                          type='number'
                          value={formik.values.tallas[el]}
                          onChange={formik.handleChange}
                          variant='outlined'
                        />
                      </FormControl>
                    ))}
                  {formik.values.tipo === 'seguridad' &&
                    [
                      't34',
                      't35',
                      't36',
                      't37',
                      't38',
                      't39',
                      't40',
                      't41',
                      't42',
                      't43',
                      't44',
                      't45',
                      't46',
                    ].map((el) => (
                      <FormControl className={classes.formControl} key={el}>
                        <TextField
                          id={`tallas[${el}]`}
                          label={el}
                          type='number'
                          value={formik.values.tallas[el]}
                          onChange={formik.handleChange}
                          variant='outlined'
                        />
                      </FormControl>
                    ))}
                  {formik.values.tipo === 'escolar' &&
                    [
                      't27',
                      't28',
                      't29',
                      't30',
                      't31',
                      't32',
                      't33',
                      't34',
                      't35',
                      't36',
                      't37',
                      't38',
                      't39',
                    ].map((el) => (
                      <FormControl className={classes.formControl} key={el}>
                        <TextField
                          id={`tallas[${el}]`}
                          label={el}
                          type='number'
                          value={formik.values.tallas[el]}
                          onChange={formik.handleChange}
                          variant='outlined'
                        />
                      </FormControl>
                    ))}
                  {formik.values.tipo === 'niños' &&
                    [
                      't19',
                      't20',
                      't21',
                      't22',
                      't23',
                      't24',
                      't25',
                      't26',
                      't27',
                      't28',
                      't29',
                      't30',
                      't31',
                      't32',
                    ].map((el) => (
                      <FormControl className={classes.formControl} key={el}>
                        <TextField
                          id={`tallas[${el}]`}
                          label={el}
                          type='number'
                          value={formik.values.tallas[el]}
                          onChange={formik.handleChange}
                          variant='outlined'
                        />
                      </FormControl>
                    ))}
                  {formik.values.tipo === 'enfermera' &&
                    [
                      't33',
                      't34',
                      't35',
                      't36',
                      't37',
                      't38',
                      't39',
                      't40',
                    ].map((el) => (
                      <FormControl className={classes.formControl} key={el}>
                        <TextField
                          id={`tallas[${el}]`}
                          label={el}
                          type='number'
                          value={formik.values.tallas[el]}
                          onChange={formik.handleChange}
                          variant='outlined'
                        />
                      </FormControl>
                    ))}

                  {formik.values.tipo === 'accesorios' &&
                    [
                      't34',
                      't35',
                      't36',
                      't37',
                      't38',
                      't39',
                      't40',
                      't41',
                      't42',
                      't43',
                      't44',
                    ].map((el) => (
                      <FormControl className={classes.formControl} key={el}>
                        <TextField
                          id={`tallas[${el}]`}
                          label={el}
                          type='number'
                          value={formik.values.tallas[el]}
                          onChange={formik.handleChange}
                          variant='outlined'
                        />
                      </FormControl>
                    ))}
                  {formik.values.tipo === 'marroquineria' &&
                    ['t34'].map((el) => (
                      <FormControl className={classes.formControl} key={el}>
                        <TextField
                          id={`tallas[${el}]`}
                          label={el}
                          type='number'
                          value={formik.values.tallas[el]}
                          onChange={formik.handleChange}
                          variant='outlined'
                        />
                      </FormControl>
                    ))}
                  <span>
                    Total:{' '}
                    {Object.values(formik.values.tallas).reduce(
                      (acc, n) => acc + n,
                      0
                    )}
                  </span>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <div>
                    <img
                      src={image}
                      alt='new-shoe'
                      style={{ width: '100%', height: 'auto', maxWidth: '20%' }}
                    />
                  </div>
                  <FormControl className={classes.formControl}>
                    <input
                      accept='image/*'
                      style={{ display: 'none' }}
                      id='image'
                      multiple
                      type='file'
                      onChange={handleImageChange}
                    />
                    <label htmlFor='image'>
                      <Button variant='contained' component='span'>
                        Subir la imagen
                      </Button>
                    </label>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>
            {msg && showMsg()}
            <Grid item xs={12}>
              {loading && <CircularProgress />}
              {error && <p>{error.graphQLErrors}</p>}
              <Button
                size='small'
                variant='contained'
                color='primary'
                type='submit'>
                Guardar Zapato
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default NewZapato;
