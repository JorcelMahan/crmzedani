import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {gql, useQuery} from "@apollo/client";

const GET_VENTAS = gql`
    query allventas {
        allventas {
            id
            total
        }
    }
`;
const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginTop: "20px"
    },

    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
const Count = ({total}) => {
    return (
        <span>
            {total}
        </span>
    )
}
export default function GoalWeek() {
    const classes = useStyles();
    const {loading, error, data} = useQuery(GET_VENTAS);
    if (loading) return "Loading"
    if (error) return `error: ${error}`
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Meta del dia
                </Typography>
                <Typography variant="h5" component="h2">
                    <Count total={data.allventas.length}/> de 150 zapatos
                </Typography>

                <Typography variant="body2" component="p">
                    Todo es posible para aquel que cree
                </Typography>
            </CardContent>
        </Card>
    );
}
