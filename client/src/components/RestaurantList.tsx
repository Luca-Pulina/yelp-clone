import React, { MouseEvent, useContext, useEffect } from 'react';
import { IRestaurant } from './models/restaurant';

import { RestaurantsContext } from '../context/RestaurantContext'
import RestaurantFinder from '../apis/RestaurantFinder';
import { useHistory } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import RestaurantCard from './RestaurantCard';

const RestaurantList: React.FC = () => {

    let history = useHistory()
    let { restaurants, setRestaurants } = useContext(RestaurantsContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/");
                console.log(response.data.data.restaurants);
                setRestaurants(response.data.data.restaurants);
            } catch (error) {

            }
        }
        fetchData()
    }, [])




    const handleRestaurantSelect = (id: number) => {
        history.push(`/restaurants/${id}`)
    }

    return (
        <>
            <Grid container xs={12}>
                <Grid item xs={2}></Grid>
                <Grid container xs={8} spacing={4}>
                    {restaurants && restaurants.map((restaurant: IRestaurant) => {
                        return (
                            <Grid item xs={12} sm={4} >
                                <RestaurantCard restaurantData={restaurant} />
                            </Grid>
                        )
                    }
                    )}
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>

        </>
    )
}

export default RestaurantList;