import React from 'react';
import AddRestaurant from '../components/AddRestaurant';
import RestaurantList from '../components/RestaurantList';
import { Grid } from '@material-ui/core';

const Home: React.FC = () => {
    return (
            <Grid container direction="column">
                <AddRestaurant />
                <RestaurantList />
            </Grid>
    )
}

export default Home;