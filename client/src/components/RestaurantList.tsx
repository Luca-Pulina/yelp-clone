import React, { MouseEvent, useContext, useEffect } from 'react';
import classes from './RestaurantList.module.css';

import {IRestaurant} from './models/restaurant'

import {RestaurantsContext} from '../context/RestaurantContext'
import RestaurantFinder from '../apis/RestaurantFinder';
import { useHistory } from 'react-router-dom';
const RestaurantList = () => {

    let history = useHistory()
    let {restaurants, setRestaurants} = useContext(RestaurantsContext);

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
    },[])

    const handleUpdate =(e: MouseEvent, id: number) => {
        e.stopPropagation();
        history.push(`/restaurants/${id}/update`)
    }

    const handleDelete = async(e: MouseEvent, id: number) => {
        e.stopPropagation();
        try {
            const response = await RestaurantFinder.delete(`/${id}`);
            console.log(response);
            setRestaurants(restaurants.filter((restaurant: IRestaurant)  => restaurant.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    const handleRestaurantSelect = (id: number) => {
        history.push(`/restaurants/${id}`)
    }

    return (
        <div>
            <table>
                <thead>
                    <tr className={classes.Tr}>
                        <th className={classes.Th}>Restaurant</th>
                        <th className={classes.Th}>Location</th>
                        <th className={classes.Th}>Price Range</th>
                        <th className={classes.Th}>Rating</th>
                        <th className={classes.Th}>Edit</th>
                        <th className={classes.Th}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map( (restaurant: IRestaurant) => {
                        return (             
                            <tr className={classes.Tr} key={restaurant.id} onClick={() => handleRestaurantSelect(restaurant.id)}>
                                <td className={classes.Td}>{restaurant.name}</td>
                                <td className={classes.Td}>{restaurant.location}</td>
                                <td className={classes.Td}>{restaurant.price_range}</td>
                                <td className={classes.Td}>rating</td>
                                <td className={classes.Td}><button onClick={(e) => handleUpdate(e, restaurant.id)}>Edit</button></td>
                                <td className={classes.Td}><button onClick={(e) => handleDelete(e, restaurant.id)}>Delete</button></td>
                            </tr>                                                
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList;