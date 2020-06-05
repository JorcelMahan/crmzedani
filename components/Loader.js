import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
        cool: {
            display: 'inline-block',
            position: 'relative',
            width: '64px',
            height: '64px',
            '& div': {
                position: 'absolute',
                width: '13px',
                height: '13px',
                borderRadius: '50%',
                background: '#000',
                animation: 'joma 1.2s linear infinite'
            },
            '& div: nth-child(1)': {
                top: '6px',
                left: '6px',
                animationDelay: '0s'
            },
            '& div:nth-child(2)': {
                top: '6px',
                left: '26px',
                animationDelay: '-0.4s'
            },
            '& div:nth-child(3)': {
                top: '6px',
                left: '45px',
                animationDelay: '-0.8s'
            },
            '& div:nth-child(4)': {
                top: '26px',
                left: '6px',
                animationDelay: '-0.4s'
            },
            '& div:nth-child(5)': {
                top: '26px',
                left: '26px',
                animationDelay: '-0.8s'
            },
            '& div:nth-child(6)': {
                top: '26px',
                left: '45px',
                animationDelay: '-1.2s'
            },
            '& div:nth-child(7)': {
                top: '45px',
                left: '6px',
                animationDelay: '-0.8s'
            },
            '& div:nth-child(8)': {
                top: '45px',
                left: '26px',
                animationDelay: '-0.8s'
            },
            '& div:nth-child(9)': {
                top: '45px',
                left: '45px',
                animationDelay: '-1.6s'
            },
            '@keyframes joma': {
                '0%, 100%': {
                    opacity: 1
                },

                '50%': {
                    opacity: 0.5,
                }
            }
        },
    }))
;
export default function Loader() {
    const classes = useStyles();
    return (
        <div className={classes.cool}>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
        </div>
    );
}