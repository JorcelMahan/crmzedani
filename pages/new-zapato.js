import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {useFormik} from 'formik';
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {useMutation, gql} from '@apollo/client';
import {useRouter} from 'next/router';
import Alert from '@material-ui/lab/Alert';
import ModalAddColor from "../components/Zapatos/ModalAddColor";
import Paper from "@material-ui/core/Paper";
import MuiTypography from "../theme/overrides/MuiTypography";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const ADD_ZAPATO = gql`
    mutation addZapato($input: ZapatoInput) {
        addZapato(input: $input)
    }
`;
const useStyles = makeStyles(theme => ({
    card: {
        width: '100%',
        padding: '1rem',
        '& .MuiTextField-root': {
            fontSize: "1rem",
        },
    },
    cardContent: {
        display: 'flex',
        justifyContent: "space-around",
        flexWrap: "wrap"
    },
    paper: {
        margin: 'auto'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    formControl: {
        margin: theme.spacing(1),
        width: "30%",
    },


    groupPlus: {
        display: 'flex',
        alignItems: 'center',
        width: "30%",
        padding: 0
    }
}))
const NewZapato = () => {
    const classes = useStyles();
    const router = useRouter();
    const [image, setImage] = useState(
        'https://www.vippng.com/png/detail/7-76841_shoe-icon-shoes-png.png'
    );
    const [msg, setMsg] = useState(null);
    const showMsg = () => <
        Alert
        severity='error'> {msg}
    </Alert>;
    const [addZapato] = useMutation(ADD_ZAPATO);
    const [colors, setColors] = useState([])
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
            almacen: 'miraflores',
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
                await router.push(`/productos/${almacen}`);
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
        try {
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
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        const source = axios.CancelToken.source();

        async function getColors() {
            try {
                const result = await axios.get('https://zedanibackend.herokuapp.com/api/colors', {
                    cancelToken: source.token
                });
                setColors(result.data)
            } catch (e) {
                console.log(e);
            }
        }

        getColors();
        return () => {
            source.cancel();
        }
    }, [colors])
    return (
        <Grid container spacing={2} style={{padding: '2rem'}}>
            <Grid item xs={12}>
                <Typography variant="h2">
                    Crear Nuevo Producto
                </Typography>
            </Grid>
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
                                            variant="outlined"
                                        />
                                    </FormControl>
                                    <div className={classes.groupPlus}>
                                        <FormControl className={classes.formControl} variant="outlined"
                                                     style={{flexGrow: 1}}>
                                            <InputLabel htmlFor='color'>Color</InputLabel>
                                            <Select
                                                native
                                                required
                                                inputProps={{
                                                    id: 'color',
                                                    name: 'color'
                                                }}
                                                value={formik.values.color}
                                                onChange={formik.handleChange}
                                            >
                                                <option aria-label="None" value=""/>
                                                {
                                                    colors.map(color => (
                                                        <option key={color._id} value={color.name}>
                                                            {color.nombre}
                                                        </option>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                        <ModalAddColor/>
                                    </div>

                                    <FormControl className={classes.formControl}>
                                        <TextField
                                            id='catalogo'
                                            label='Catalogo'
                                            value={formik.values.catalogo}
                                            onChange={formik.handleChange}
                                            variant="outlined"
                                        />
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <TextField
                                            id='marca'
                                            label='Marca'
                                            required
                                            value={formik.values.marca}
                                            onChange={formik.handleChange}
                                            variant="outlined"
                                        />
                                    </FormControl>
                                    <FormControl className={classes.formControl} variant="outlined">
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
                                    <FormControl className={classes.formControl} variant="outlined">
                                        <InputLabel id='almacen'>Almacen</InputLabel>
                                        <Select
                                            id='almacen'
                                            name='almacen'
                                            labelId='almacen'
                                            required
                                            value={formik.values.almacen}
                                            onChange={formik.handleChange}
                                        >
                                            {['sopocachi', 'san-miguel', 'miraflores', 'llojeta'].map(
                                                (e) => (
                                                    <MenuItem key={e} value={e}>
                                                        {e}
                                                    </MenuItem>
                                                )
                                            )}
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
                                            variant="outlined"
                                        />
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <TextField
                                            id='descuentoPromotora'
                                            label='Descuento Promotora'
                                            value={formik.values.descuentoPromotora}
                                            onChange={formik.handleChange}
                                            variant="outlined"
                                        />
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <TextField
                                            id='precioPublico'
                                            label='Precio publico'
                                            required
                                            value={formik.values.precioPublico}
                                            onChange={formik.handleChange}
                                            variant="outlined"
                                        />
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <span>Precio Promotora: {formik.values.precioPublico - (formik.values.precioPublico * (formik.values.descuentoPromotora / 100))}</span>
                                    </FormControl>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    {formik.values.tipo === 'hombre' &&
                                    ['t38', 't39', 't40', 't41', 't42', 't43'].map((el) => (
                                        <FormControl className={classes.formControl} key={el}>
                                            <TextField
                                                id={`tallas[${el}]`}
                                                label={el}
                                                type='number'
                                                value={formik.values.tallas[el]}
                                                onChange={formik.handleChange}
                                                variant="outlined"
                                            />
                                        </FormControl>
                                    ))}
                                    {formik.values.tipo === 'mujer' &&
                                    ['t35', 't36', 't37', 't38', 't39'].map((el) => (
                                        <FormControl className={classes.formControl} key={el}>
                                            <TextField
                                                id={`tallas[${el}]`}
                                                label={el}
                                                type='number'
                                                value={formik.values.tallas[el]}
                                                onChange={formik.handleChange}
                                                variant="outlined"
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
                                    ].map((el) => (
                                        <FormControl className={classes.formControl} key={el}>
                                            <TextField
                                                id={`tallas[${el}]`}
                                                label={el}
                                                type='number'
                                                value={formik.values.tallas[el]}
                                                onChange={formik.handleChange}
                                                variant="outlined"
                                            />
                                        </FormControl>
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
                                        <FormControl className={classes.formControl} key={el}>
                                            <TextField
                                                id={`tallas[${el}]`}
                                                label={el}
                                                type='number'
                                                value={formik.values.tallas[el]}
                                                onChange={formik.handleChange}
                                                variant="outlined"
                                            />
                                        </FormControl>
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
                                        <FormControl className={classes.formControl} key={el}>
                                            <TextField
                                                id={`tallas[${el}]`}
                                                label={el}
                                                type='number'
                                                value={formik.values.tallas[el]}
                                                onChange={formik.handleChange}
                                                variant="outlined"
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
                                                variant="outlined"
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
                                            style={{width: '100%', height: 'auto', maxWidth: '20%'}}
                                        />
                                    </div>
                                    <FormControl className={classes.formControl}>
                                        <input
                                            accept='image/*'
                                            style={{display: 'none'}}
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
                            <Button
                                size='small'
                                variant='contained'
                                color='primary'
                                type='submit'
                            >
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
