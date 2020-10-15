import React, { useContext, useState } from 'react';
import classes from './AddRestaurant.module.css';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantContext';

const AddRestaurant = () => {
    const {addRestaurants} = useContext(RestaurantsContext)
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");

    const handleSubmit = async(e: React.MouseEvent) => {
        e.preventDefault(); 
            try {
                const response =  await RestaurantFinder.post('/', {
                    name,
                    location,
                    price_range: priceRange
                });
                addRestaurants(response.data.data);
                console.log(response)
            } catch (error) {
                console.log('error')
            }  
    }

    return (
        <div className={classes.Container}>
            <form>
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e => setName(e.target.value))}
                        placeholder="name" />
                    <input
                        type="text"
                        value={location}
                        onChange={(e => setLocation(e.target.value))}
                        placeholder="location" />
                    <select
                        value={priceRange}
                        onChange={(e => setPriceRange(e.target.value))}
                    >
                        <option defaultChecked disabled value="Price Range">Price Range</option>
                        <option value="1">€</option>
                        <option value="2">€€</option>
                        <option value="3">€€€</option>
                        <option value="4">€€€€</option>
                        <option value="5">€€€€€</option>
                    </select>
                    <button onClick={handleSubmit}>Send</button>
                </div>

            </form>
        </div>
    )
}

export default AddRestaurant;