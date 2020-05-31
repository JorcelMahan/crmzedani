import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },

    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function GoalWeek() {
    const classes = useStyles();


    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Meta de la semana
                </Typography>
                <Typography variant="h5" component="h2">
                    Bs 3000
                </Typography>

                <Typography variant="body2" component="p">
                   Todo es posible para aquel que cree
                </Typography>
            </CardContent>
        </Card>
    );
}
