import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';
import { useFormik } from 'formik';
import axios from 'axios';
import {
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core';

import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Alert from '@material-ui/lab/Alert';
const ADD_ZAPATO = gql`
  mutation addZapato($input: ZapatoInput) {
    addZapato(input: $input)
  }
`;
const useStyles = makeStyles({
  root: {
    width: '75%',
    minWidth: 275,
    margin: 'auto',
    padding: '1rem',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  fieldset: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
});

const NewZapato = () => {
  const classes = useStyles();
  const router = useRouter();
  const [image, setImage] = useState(
    'https://www.vippng.com/png/detail/7-76841_shoe-icon-shoes-png.png'
  );
  const [msg, setMsg] = useState(null);
  const showMsg = () => <Alert severity='error'>{msg}</Alert>;
  const [addZapato] = useMutation(ADD_ZAPATO);
  const formik = useFormik({
    initialValues: {
      codigo: '',
      color: '',
      catalogo: '',
      marca: '',
      tipo: '',
      costo: '',
      descuentoPromotora: '',
      precioPublico: '',
      almacen: '',
      tallas: {
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
      },
    },
    onSubmit: async (values) => {
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
              almacen,
              descuentoPromotora: Number(descuentoPromotora),
              catalogo,
              costo: Number(costo),
              marca,
              precioPublico: Number(precioPublico),
              tallas,
              tipo,
              image,
            },
          },
        });
        router.push('/zapatos');
      } catch (error) {
        setMsg(error.message.replace('GraphQL error:', ''));
        setTimeout(() => {
          setMsg(null);
        }, 5000);
      }
    },
  });
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file, file.name);
    const res = await axios.post(
      'https://zedanibackend.herokuapp.com/api/images',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          console.log(e.loaded);
        },
      }
    );
    setImage(res.data);
  };

  return (
    <>
      <h2>Nuevo Zapato</h2>
      <form onSubmit={formik.handleSubmit}>
        <Card className={classes.root}>
          <CardContent>
            <fieldset className={classes.fieldset}>
              <legend>Sobre el zapato</legend>
              <TextField
                id='codigo'
                label='Codigo'
                required
                value={formik.values.codigo}
                onChange={formik.handleChange}
              />
              <TextField
                id='color'
                label='Color'
                required
                value={formik.values.color}
                onChange={formik.handleChange}
              />
              <TextField
                id='catalogo'
                label='Catalogo'
                value={formik.values.catalogo}
                onChange={formik.handleChange}
              />
              <TextField
                id='marca'
                label='Marca'
                required
                value={formik.values.marca}
                onChange={formik.handleChange}
              />
              <FormControl>
                <InputLabel id='tipo'>Tipo</InputLabel>
                <Select
                  id='tipo'
                  name='tipo'
                  labelId='tipo'
                  required
                  value={formik.values.tipo}
                  onChange={formik.handleChange}
                >
                  {[
                    'hombre',
                    'mujer',
                    'seguridad',
                    'niño',
                    'niña',
                    'enfermera',
                  ].map((e) => (
                    <MenuItem key={e} value={e}>
                      {e}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </fieldset>
            <fieldset className={classes.fieldset}>
              <legend>Precio</legend>
              <TextField
                id='costo'
                label='Costo'
                value={formik.values.costo}
                onChange={formik.handleChange}
              />
              <TextField
                id='descuentoPromotora'
                label='Descuento Promotora'
                value={formik.values.descuentoPromotora}
                onChange={formik.handleChange}
              />
              <TextField
                id='precioPublico'
                label='Precio publico'
                required
                value={formik.values.precioPublico}
                onChange={formik.handleChange}
              />
              <span>Precio Promotora: 340</span>
            </fieldset>
            <fieldset className={classes.fieldset}>
              <legend>Tallas</legend>
              {formik.values.tipo === 'hombre' &&
                ['t38', 't39', 't40', 't41', 't42', 't43'].map((el) => (
                  <TextField
                    id={`tallas[${el}]`}
                    label={el}
                    key={el}
                    type='number'
                    value={formik.values.tallas[el]}
                    onChange={formik.handleChange}
                  />
                ))}
              {formik.values.tipo === 'mujer' &&
                ['t35', 't36', 't37', 't38', 't39'].map((el) => (
                  <TextField
                    id={`tallas[${el}]`}
                    label={el}
                    key={el}
                    type='number'
                    value={formik.values.tallas[el]}
                    onChange={formik.handleChange}
                  />
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
                ].map((el) => (
                  <TextField
                    id={`tallas[${el}]`}
                    label={el}
                    key={el}
                    type='number'
                    value={formik.values.tallas[el]}
                    onChange={formik.handleChange}
                  />
                ))}
              {formik.values.tipo === 'niña' &&
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
                ].map((el) => (
                  <TextField
                    id={`tallas[${el}]`}
                    label={el}
                    key={el}
                    type='number'
                    value={formik.values.tallas[el]}
                    onChange={formik.handleChange}
                  />
                ))}
              {formik.values.tipo === 'niño' &&
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
                ].map((el) => (
                  <TextField
                    id={`tallas[${el}]`}
                    label={el}
                    key={el}
                    type='number'
                    value={formik.values.tallas[el]}
                    onChange={formik.handleChange}
                  />
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
                  <TextField
                    id={`tallas[${el}]`}
                    label={el}
                    key={el}
                    type='number'
                    value={formik.values.tallas[el]}
                    onChange={formik.handleChange}
                  />
                ))}
              <span>
                Total:{' '}
                {Object.values(formik.values.tallas).reduce(
                  (acc, n) => acc + n,
                  0
                )}
              </span>
            </fieldset>
            <fieldset className={classes.fieldset}>
              <legend>Otros</legend>

              <FormControl>
                <InputLabel id='almacen'>Almacen</InputLabel>
                <Select
                  id='almacen'
                  name='almacen'
                  labelId='almacen'
                  required
                  value={formik.values.almacen}
                  onChange={formik.handleChange}
                >
                  {['sopocachi', 'san miguel', 'miraflores', 'llojeta'].map(
                    (e) => (
                      <MenuItem key={e} value={e}>
                        {e}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
              <div>
                <img
                  src={image}
                  alt='new-shoe'
                  style={{ width: '100%', height: 'auto', maxWidth: '20%' }}
                />
              </div>
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
            </fieldset>
          </CardContent>
          {msg && showMsg()}
          <CardActions>
            <Button
              size='small'
              variant='contained'
              color='primary'
              type='submit'
            >
              Guardar Zapato
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
};

export default NewZapato;
