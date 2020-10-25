import React, {MouseEvent} from 'react';
import { useHistory } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { IRestaurant } from './models/restaurant';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

interface Props {
    restaurantData: IRestaurant;
}


const RestaurantCard: React.FC<Props> = ({ restaurantData }) => {

    let history = useHistory();

    const handleUpdate = (e: MouseEvent, id: number) => {
        e.stopPropagation();
        history.push(`/restaurants/${id}/update`)
    }

    const handleDelete = async (e: MouseEvent, id: number) => {
        e.stopPropagation();
        try {
            const response = await RestaurantFinder.delete(`/${id}`);
            console.log(response);
            //setRestaurants(restaurants.filter((restaurant: IRestaurant) => restaurant.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    const classes = useStyles();
    return (

        <Card className={classes.root}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={restaurantData.name}
                subheader={restaurantData.location}
            />
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Rating
                </Typography>
                <Typography variant="h5" component="h2">
                   {/*  {restaurantData.name} */}
                   Rating
                </Typography>

            </CardContent>
            <CardActions>
                <Button variant="outlined" color="primary" onClick={(e) => handleUpdate(e, restaurantData.id)}>Edit</Button>
                <Button variant="outlined" color="secondary" onClick={(e) => handleDelete(e, restaurantData.id)}>Delete</Button>
            </CardActions>
        </Card>

    )
}

export default RestaurantCard;