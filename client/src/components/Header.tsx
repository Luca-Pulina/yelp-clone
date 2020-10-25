import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RestaurantIcon from '@material-ui/icons/Restaurant';


const useStyles = makeStyles({
    typographyStyles: {
        flex: '1'
    }
})

const Header: React.FC = () => {
    const classes = useStyles();

    return (
        <AppBar position="static" >
            <Toolbar>
                <Typography className={classes.typographyStyles}>
                        My preferite Restaurants
                </Typography>
                <RestaurantIcon />
            </Toolbar>
        </AppBar>
    )
}

export default Header;