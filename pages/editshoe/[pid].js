import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Formik } from 'formik';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

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
const GET_SHOE = gql`
  query zapato($id: ID) {
    zapato(id: $id) {
      codigo
      color
      catalogo
      marca
      tipo
      costo
      descuentoPromotora
      precioPublico
      almacen
      tallas {
        t27
        t28
        t29
        t30
        t31
        t32
        t33
        t34
        t35
        t36
        t37
        t38
        t39
        t40
        t41
        t42
        t43
        t44
        t45
      }
      image
      stock
    }
  }
`;

const UPDATE_SHOE = gql`
  mutation editZapato($id: ID, $input: ZapatoInput) {
    editZapato(id: $id, input: $input)
  }
`;
const WrapperZapatp = ({ zapato, id }) => {
  const router = useRouter();
  const classes = useStyles();
  const [image, setImage] = useState(zapato.image);
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
  const [editZapato] = useMutation(UPDATE_SHOE);
  const updateShoe = async (values) => {
    const {
      codigo,
      color,
      catalogo,
      marca,
      tipo,
      costo,
      descuentoPromotora,
      precioPublico,
      almacen,
      tallas,
      stock,
    } = values;
    try {
      await editZapato({
        variables: {
          id,
          input: {
            codigo,
            color,
            catalogo,
            marca,
            tipo,
            costo: Number(costo),
            descuentoPromotora: Number(descuentoPromotora),
            precioPublico: Number(precioPublico),
            almacen,
            tallas,
            image,
            stock: Object.values(tallas).reduce((acc, n) => acc + n, 0),
          },
        },
      });
      router.push('/zapatos');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      enableReinitialize
      initialValues={zapato}
      onSubmit={(values) => {
        updateShoe(values);
      }}
    >
      {(props) => {
        return (
          <form onSubmit={props.handleSubmit}>
            <Card className={classes.root}>
              <CardContent>
                <fieldset className={classes.fieldset}>
                  <legend>Sobre el zapato</legend>
                  <TextField
                    id='codigo'
                    label='Codigo'
                    required
                    value={props.values.codigo}
                    onChange={props.handleChange}
                  />
                  <TextField
                    id='color'
                    label='Color'
                    required
                    value={props.values.color}
                    onChange={props.handleChange}
                  />
                  <TextField
                    id='catalogo'
                    label='Catalogo'
                    value={props.values.catalogo ? props.values.catalogo : ''}
                    onChange={props.handleChange}
                  />
                  <TextField
                    id='marca'
                    label='Marca'
                    required
                    value={props.values.marca ? props.values.marca : ''}
                    onChange={props.handleChange}
                  />
                  <FormControl>
                    <InputLabel id='tipo'>Tipo</InputLabel>
                    <Select
                      id='tipo'
                      name='tipo'
                      labelId='tipo'
                      required
                      value={props.values.tipo}
                      onChange={props.handleChange}
                    >
                      {['hombre', 'mujer', 'seguridad', 'niño', 'niña'].map(
                        (e) => (
                          <MenuItem key={e} value={e}>
                            {e}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </fieldset>
                <fieldset className={classes.fieldset}>
                  <legend>Precio</legend>
                  <TextField
                    id='costo'
                    label='Costo'
                    value={props.values.costo ? props.values.costo : ''}
                    onChange={props.handleChange}
                  />
                  <TextField
                    id='descuentoPromotora'
                    label='Descuento Promotora'
                    value={
                      props.values.descuentoPromotora
                        ? props.values.descuentoPromotora
                        : ''
                    }
                    onChange={props.handleChange}
                  />
                  <TextField
                    id='precioPublico'
                    label='Precio publico'
                    required
                    value={
                      props.values.precioPublico
                        ? props.values.precioPublico
                        : ''
                    }
                    onChange={props.handleChange}
                  />
                  <span>Precio Promotora: 340</span>
                </fieldset>
                <fieldset className={classes.fieldset}>
                  <legend>Tallas</legend>
                  {props.values.tipo === 'hombre' &&
                    ['t38', 't39', 't40', 't41', 't42', 't43'].map((el) => (
                      <TextField
                        id={`tallas[${el}]`}
                        label={el}
                        key={el}
                        type='number'
                        value={props.values.tallas[el]}
                        onChange={props.handleChange}
                      />
                    ))}
                  {props.values.tipo === 'mujer' &&
                    ['t35', 't36', 't37', 't38', 't39'].map((el) => (
                      <TextField
                        id={`tallas[${el}]`}
                        label={el}
                        key={el}
                        type='number'
                        value={props.values.tallas[el]}
                        onChange={props.handleChange}
                      />
                    ))}
                  {props.values.tipo === 'seguridad' &&
                    [
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
                        value={props.values.tallas[el]}
                        onChange={props.handleChange}
                      />
                    ))}
                  {props.values.tipo === 'niña' &&
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
                        value={props.values.tallas[el]}
                        onChange={props.handleChange}
                      />
                    ))}
                  {props.values.tipo === 'niño' &&
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
                        value={props.values.tallas[el]}
                        onChange={props.handleChange}
                      />
                    ))}
                  <span>
                    Total:{' '}
                    {Object.values(props.values.tallas).reduce(
                      (acc, n) => acc + n,
                      0
                    )}
                  </span>
                </fieldset>
                <fieldset className={classes.fieldset}>
                  <legend>Otros</legend>
                  <TextField
                    id='almacen'
                    label='Almacen'
                    value={props.values.almacen ? props.values.almacen : ''}
                    onChange={props.handleChange}
                  />
                  <div>
                    <img
                      src={image}
                      alt='new-shoe'
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxWidth: '20%',
                      }}
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
        );
      }}
    </Formik>
  );
};
const EditShoe = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const { loading, error, data } = useQuery(GET_SHOE, {
    variables: {
      id,
    },
  });
  if (loading) return 'Cargando...';
  if (error) return `Error, ${error.message}`;
  const { zapato } = data;
  return (
    <>
      <h2>Edit zapato</h2>
      <WrapperZapatp zapato={zapato} id={id} />
    </>
  );
};

export default EditShoe;
