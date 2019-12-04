const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    { PORT } = require('./config')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

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