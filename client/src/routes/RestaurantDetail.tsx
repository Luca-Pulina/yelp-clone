import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import AddReview from '../components/AddReview';

import Reviews from '../components/Reviews';
import { RestaurantsContext } from '../context/RestaurantContext';


interface ParamTypes {
    id: string
}



const RestaurantDetail = () => {

    const { id } = useParams<ParamTypes>();
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`);
                console.log(response)
                setSelectedRestaurant(response.data.data);

            } catch (error) {
                console.log(error);
            }

        }

        fetchData();
    }, [])

    return (
        <>

        <div>
            <h1>{selectedRestaurant.restaurants?.name}</h1>
            {selectedRestaurant &&
            <>
                <Reviews reviews={selectedRestaurant} />
                <AddReview />
            </>

        }
        </div>
        </>
    )

}

export default RestaurantDetail;