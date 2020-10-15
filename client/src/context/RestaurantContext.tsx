import React, { useState, createContext } from 'react';

export const RestaurantsContext = createContext<any>({});

export const RestaurantsContextProvider = (props: any) => {
    const [restaurants, setRestaurants] = useState(Array());
    const [selectedRestaurant, setSelectedRestaurant] = useState(Array())

    const addRestaurants = (restaurant: any) => {
        setRestaurants([...restaurants, restaurant]);
    };

    return (
        <RestaurantsContext.Provider
            value={
                {
                    restaurants,
                    setRestaurants,
                    addRestaurants,
                    selectedRestaurant,
                    setSelectedRestaurant
                }
            }>
            {props.children}
        </RestaurantsContext.Provider>
    )
}

