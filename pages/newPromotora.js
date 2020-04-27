import React from 'react';
import SideBar from '../components/SideBar';
import NavigationPromotora from '../components/NavigationPromotora';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { useFormik } from 'formik';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const ADD_PROMOTORA = gql`
  mutation AddPromotora($input: PromotoraInput) {
    addPromotora(input: $input)
  }
`;
const GET_PROMOTORAS = gql`
  {
    promotoras {
      id
      nombres
      apellidos
      razonSocial
      nit
      habilitada
    }
  }
`;
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '50%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  fieldset: {
    padding: theme.spacing(5),
  },
}));

const metodosDeInscripcion = ['cartera', 'zapatos'];

const NewPromotora = () => {
  //router
  const router = useRouter();
  const classes = useStyles();
  const [addPromotora] = useMutation(ADD_PROMOTORA, {
    update(cache, { data: { addPromotora } }) {
      //get obj of cache desire
      const { promotoras } = cache.readQuery({ query: GET_PROMOTORAS });
      //override
      cache.writeQuery({
        query: GET_PROMOTORAS,
        data: {
          promotoras: [...promotoras, addPromotora],
        },
      });
    },
  });
  const formik = useFormik({
    initialValues: {
      nombres: '',
      apellidos: '',
      ci: '',
      celular: '',
      nit: '',
      razonSocial: '',
      metodoInscripcion: '',
    },
    onSubmit: async (values) => {
      const {
        nombres,
        apellidos,
        ci,
        metodoInscripcion,
        celular,
        nit,
        razonSocial,
      } = values;
      try {
        await addPromotora({
          variables: {
            input: {
              nombres,
              apellidos,
              ci,
              metodoInscripcion,
              celular: Number(celular),
              nit,
              razonSocial,
            },
          },
        });
        router.push('/promotoras');
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <SideBar>
      <NavigationPromotora />
      <div className={classes.paper}>
        <h2>New Promotora</h2>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <fieldset className={classes.fieldset}>
            <legend>Datos Personales: </legend>
            <TextField
              id='nombres'
              label='Nombres'
              margin='normal'
              variant='outlined'
              autoFocus
              required
              fullWidth
              value={formik.values.nombres}
              onChange={formik.handleChange}
              // helperText='Incorrect'
            />
            <TextField
              id='apellidos'
              label='apellidos'
              required
              fullWidth
              variant='outlined'
              value={formik.values.apellidos}
              onChange={formik.handleChange}
            />
            <TextField
              id='ci'
              label='ci'
              required
              fullWidth
              variant='outlined'
              value={formik.values.ci}
              onChange={formik.handleChange}
            />
            <TextField
              id='celular'
              type='tel'
              label='celular'
              required
              fullWidth
              variant='outlined'
              value={formik.values.celular}
              onChange={formik.handleChange}
            />
          </fieldset>
          <fieldset>
            <legend>Datos de Facturacion</legend>
            <TextField
              id='nit'
              label='nit'
              required
              fullWidth
              variant='outlined'
              value={formik.values.nit}
              onChange={formik.handleChange}
            />
            <TextField
              id='razonSocial'
              label='razonSocial'
              variant='outlined'
              required
              fullWidth
              value={formik.values.razonSocial}
              onChange={formik.handleChange}
            />
          </fieldset>
          <fieldset>
            <legend>Datos de inscripcion</legend>
            <TextField
              id='metodoInscripcion'
              name='metodoInscripcion'
              select
              label='Metodo de inscripcion'
              helperText='Seccione un metodo de inscripcion'
              value={formik.values.metodoInscripcion}
              onChange={formik.handleChange}
            >
              {metodosDeInscripcion.map((op) => (
                <MenuItem key={op} value={op}>
                  {op}
                </MenuItem>
              ))}
            </TextField>
          </fieldset>
          <Button
            variant='contained'
            color='primary'
            size='large'
            startIcon={<SaveIcon />}
            type='submit'
          >
            Inscribir
          </Button>
        </form>
      </div>
    </SideBar>
  );
};

export default NewPromotora;
