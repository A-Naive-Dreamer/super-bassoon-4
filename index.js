const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    {
        PORT,
        JWT_SECRET_KEY
    } = require('./config'),
    jwt = require('express-jwt')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
    jwt({ secret: JWT_SECRET_KEY }).unless({
        path: [
            {
                url: '/',
                method: ['GET']
            },
            {
                url: '/users/sign-up',
                method: ['POST']
            },
            {
                url: '/users/log-in',
                method: ['POST']
            }
        ]
    })
)
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.send({
            message: 'You are not allowed to enter this endpoints.'
        })
    }

    next()
})

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Welcome to my sequelize api.'
    })
})

app.use('/users', require('./routes/users'))
app.use('/todos', require('./routes/todos'))

app.listen(PORT, () => {
    console.log(`This app is listening in port ${PORT}.`)
})