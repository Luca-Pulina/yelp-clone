import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder'


interface ParamTypes {
    id: string
}

const UpdateRestaurant = () => {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`);
                console.log(response)
                setName(response.data.data.restaurants.name);
                setLocation(response.data.data.restaurants.location);
                setPriceRange(response.data.data.restaurants.price_range);
            } catch (error) {
                console.log(error)
            }

        }
        fetchData();
    }, [])

    let history = useHistory()
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");

    const handleSubmit = async(e: React.MouseEvent) => {
        e.preventDefault();
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`,
        {
            name,
            location,
            price_range: priceRange
        })
        history.push('/');
    }


    const { id } = useParams<ParamTypes>();

    return (
        <div>
            <h3>Restaurant: {name}</h3>
            <form>
                <label>Name</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="name" />

                <label>Location</label>
                <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    type="text"
                    id="location" />

                <label>Price Range</label>
                <input
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    type="number"
                    id="price_range" />

                <button  onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default UpdateRestaurant;