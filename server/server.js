require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const db = require('./db/index')

const app = express()

const corsOptions = {
    origin: process.env.CLIENT_HOST,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors())

//Middleware read json (example body)
app.use(express.json())

// GET all restaurants
app.get('/api/v1/restaurants', cors(corsOptions), async (req, res) => {

    try {
        //const result = await db.query('SELECT * FROM restaurants')
        const result = await db.query(`SELECT * FROM restaurants
                                     LEFT JOIN (SELECT restaurant_id, count(*), TRUNC(AVG(rating),1) as average_rating
                                     FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id
                            `)

        res.status(200).json(
            {
                status: 'success',
                results: result.rows.length,
                data: {
                    restaurants: result.rows
                }
            }
        )
    } catch (error) {
        console.log('Error: ', error)
    }

})

// GET SINGLE RESTAURANT

app.get('/api/v1/restaurants/:id', async (req, res) => {

//    const restaurants = await db.query(`SELECT * FROM restaurants WHERE id = ${req.params.id}`)
    const restaurants = await db.query(`SELECT * FROM restaurants
        LEFT JOIN (SELECT restaurant_id, count(*), TRUNC(AVG(rating),1) as average_rating
        FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id where id = ${req.params.id}`)
    const reviews = await db.query(`SELECT * FROM reviews WHERE restaurant_id = ${req.params.id}`)

    try {
        res.status(200).json({
            status: 'success',
            data: {
                restaurants: restaurants.rows[0],
                reviews: reviews.rows,
            }
        })
    } catch (error) {
        console.log(error)
    }

})


// POST - CREATE SINGLE RESTAURANT

app.post('/api/v1/restaurants', async (req, res) => {
    console.log('called post!')
    try {

        const result = await db.query(
            `INSERT INTO restaurants (name, location, price_range)
            VALUES ($1, $2, $3)`,
            [req.body.name, req.body.location, req.body.price_range]
        )

        res.status(201).json({
            status: 'success',
            data: {
                name: req.body.name,
                location: req.body.location,
                price_range: req.body.price_range
            }
        }

        )

    } catch (error) {
        console.log(error)
    }
})

// PUT - UPDATE SINGLE RESTAURANT

app.put('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const results = await db.query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
            [req.body.name, req.body.location, req.body.price_range, req.params.id]
        );

        res.status(200).json({
            status: "succes",
            data: {
                restaurant: results.rows[0],
            },
        });
    } catch (error) {
        console.log(error)
    }
})


// DELETE - DELETE SINGLE RESTAURANT

app.delete('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const result = await db.query(`
        DELETE FROM restaurants where id=${req.params.id};
        `)
    } catch (error) {
        console.log(error)
    }

    res.status(204).json({
        status: 'success'
    })
})

// POST - ADD NEW REVIEW

app.post('/api/v1/restaurants/:id/add-review', async (req, res) => {
    try {
        const newReview = await db.query(
            `INSERT INTO reviews (name, rating, review, restaurant_id)
            VALUES ($1, $2, $3, $4)`,
            [req.body.name, req.body.rating, req.body.review, req.params.id]
        )

        res.status(201).json({
            status: 'success',
            data: {
                review: newReview.rows[0]
            }
        }

        )
    } catch (error) {
        
    }
})

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`server is started on port ${port}`)
})