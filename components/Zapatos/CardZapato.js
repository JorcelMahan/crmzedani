import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Size from "./Size";
import {useRouter} from 'next/router'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 'auto',
        maxWidth: '100%',
        paddingTop: '56.25%', // 16:9?
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


const Sizes = ({zapato, almacen}) => {
    const {tallas} = zapato
    const availableSizes = [];
    for (let [key, value] of Object.entries(tallas)) {
        if (value !== 0) {
            availableSizes.push([key, value])
        }
    }
    return (
        <div>
            {
                availableSizes.map(size => (
                    <Size size={size} key={size} zapato={zapato} almacen={almacen}/>
                ))
            }
        </div>
    )
}
export default function CardZapato({zapato, i}) {
    const classes = useStyles();
    const {codigo, image, color, stock, tallas, id, precioPublico} = zapato;
    const [expanded, setExpanded] = useState(false);
    const router = useRouter();
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                title={codigo}
                subheader={color}
            />
            <CardMedia
                className={classes.media}
                image={image}
                title={codigo}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Bs {precioPublico}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        Tallas Disponibles
                    </Typography>
                    <Sizes zapato={zapato} almacen={router.pathname.slice(11)}/>
                </CardContent>
            </Collapse>
        </Card>
    );
}
