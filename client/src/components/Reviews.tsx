import React from 'react';
import { IRestaurant } from './models/restaurant';
import { IReview } from './models/review';
import classes from './Reviews.module.css';
import StarRating from './StarRating';

/* interface Props {
    restaurant: IRestaurant;
    reviews: IReview[];
} */

interface Props {
    reviews: any
}

const Reviews = ({ reviews }: Props) => {
    console.log('reviews', reviews)
    return (
        <div className={classes.ReviewsContainer}>
            
                { reviews.reviews && reviews.reviews.map((review: IReview) => {
                    return (
                        <div className={classes.Reviews} key={review?.id} >
                            <p>{review?.name}</p>
                            <p>{review?.review}</p>
                            <p><StarRating rating={review?.rating}/></p>
                        </div>
                    )
                })}
        </div >

    )
}

export default Reviews;