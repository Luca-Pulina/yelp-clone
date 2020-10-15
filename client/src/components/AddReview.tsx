import React, { useState, useContext, MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';


interface ParamTypes {
    id: string
}

const AddReview = () => {
    const [name, setName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState("Rating");

    const { id } = useParams<ParamTypes>();

    const handleSubmitReview = async (e: MouseEvent) => {
        
        e.preventDefault(); 
        try {
            const response = await RestaurantFinder.post(`/${id}/add-review`, {
                name,
                review: reviewText,
                rating
            })
            // Add confirm review page
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <form action="">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    id="name"
                    placeholder="name" />
                <label htmlFor="rating">Rating</label>
                <select id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                >
                    <option defaultChecked disabled value="Price Range">Price Range</option>
                    <option value="1">€</option>
                    <option value="2">€€</option>
                    <option value="3">€€€</option>
                    <option value="4">€€€€</option>
                    <option value="5">€€€€€</option>
                </select>
                <label htmlFor="review">Review</label>
                <textarea 
                    id="review"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}></textarea>
                <button onClick={handleSubmitReview}>Submit</button>
            </form>
        </div>
    )
}

export default AddReview;