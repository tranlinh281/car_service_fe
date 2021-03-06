import React from 'react'
import { Button, IconButton, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 0,
        margin: 0,
    },
    secondary: {
        backgroundColor: theme.palette.secondary.light,
        '& .MuiButton-label': {
            color: theme.palette.secondary.main,
        }
    },
    primary: {
        backgroundColor: theme.palette.primary.light,
        '& .MuiButton-label': {
            color: theme.palette.primary.main,
        }
    },
}))

export default function ButtonAction(props) {

    const { color, children, onClick } = props;
    const classes = useStyles();

    return (
        <IconButton
            className={`${classes.root} ${classes[color]}`}
            onClick={onClick}>
            {children}
        </IconButton>
    )
}