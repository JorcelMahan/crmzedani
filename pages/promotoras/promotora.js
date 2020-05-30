<<<<<<< HEAD
=======

>>>>>>> a8cb47691d5c8ea8035f8dd737a699e573e33f7a
import React from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Formik } from 'formik';

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
const GET_PROMOTORA = gql`
    query Promotora($id: ID!) {
        promotora(id: $id) {
            nombres
            apellidos
            ci
            metodoInscripcion
            celular
            nit
            razonSocial
        }
    }
`;
const UPDATE_PROMOTORA = gql`
    mutation editPromotora($id: ID!, $input: PromotoraInput) {
        editPromotora(id: $id, input: $input)
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

const EditPromotora = () => {
    const router = useRouter();
    //styles
    const classes = useStyles();
    const {
        query: { id },
    } = router;
    // query
    const { loading, error, data } = useQuery(GET_PROMOTORA, {
        variables: {
            id,
        },
    });
    const [editPromotora] = useMutation(UPDATE_PROMOTORA, {
        update(cache, { data: {editPromotora}}) {
            const {promotoras} = cache.readQuery({query:GET_PROMOTORAS});
            cache.writeQuery({
                query: GET_PROMOTORAS,
                data: {
                    promotoras: [...promotoras, editPromotora]
                }
            })
        }
    });

    if (loading) return 'Loading...';
    if (error) return `Error, ${error.message}`;

    const updatePromotora = async (values) => {
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
            await editPromotora({
                variables: {
                    id,
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
            await router.push('/promotoras');
        } catch (error) {
            console.log(error);
        }
    };
    const { promotora } = data;
    return (
        <div className={classes.paper}>
            <h2>EDIT Promotora</h2>
            <Formik
                enableReinitialize
                initialValues={promotora}
                onSubmit={(values) => {
                    updatePromotora(values);
                }}
            >
                {(props) => {
                    return (
                        <form className={classes.form} onSubmit={props.handleSubmit}>
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
                                    value={props.values.nombres}
                                    onChange={props.handleChange}
                                />
                                <TextField
                                    id='apellidos'
                                    label='apellidos'
                                    required
                                    fullWidth
                                    variant='outlined'
                                    value={props.values.apellidos}
                                    onChange={props.handleChange}
                                />
                                <TextField
                                    id='ci'
                                    label='ci'
                                    required
                                    fullWidth
                                    variant='outlined'
                                    value={props.values.ci}
                                    onChange={props.handleChange}
                                />
                                <TextField
                                    id='celular'
                                    type='tel'
                                    label='celular'
                                    required
                                    fullWidth
                                    variant='outlined'
                                    value={props.values.celular}
                                    onChange={props.handleChange}
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
                                    value={props.values.nit}
                                    onChange={props.handleChange}
                                />
                                <TextField
                                    id='razonSocial'
                                    label='razonSocial'
                                    variant='outlined'
                                    required
                                    fullWidth
                                    value={props.values.razonSocial}
                                    onChange={props.handleChange}
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
                                    value={props.values.metodoInscripcion}
                                    onChange={props.handleChange}
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
                    );
                }}
            </Formik>
        </div>
    );
};

export default EditPromotora;


