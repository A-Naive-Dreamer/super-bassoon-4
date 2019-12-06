const { Users } = require('../../db/models'),
    {
        hashPassword,
        comparePassword
    } = require('../../helpers'),
    {
        JWT_SECRET_KEY
    } = require('../../config'),
    jwt = require('jsonwebtoken')

module.exports = {
    getAll: async (req, res) => {
        try {
            const result = await Users.findAll({})

            res.send({
                message: 'Show all Users.',
                data: result
            })
        } catch (error) {
            console.log(error)
        }
    },
    login: async (req, res) => {
        try {
            await Users
                .findAll({
                    where: {
                        email: req.body.email
                    },
                    attributes: [
                        'id',
                        'firstName',
                        'lastName',
                        'password'
                    ]
                })
                .then(async result => {
                    if (result.length > 0) {
                        const decision = await comparePassword(req.body.password, result[0].password),
                            id = result[0].id,
                            firstName = result[0].firstName,
                            lastName = result[0].lastName

                        if (decision) {
                            const token = await jwt.sign(
                                {
                                    id,
                                    firstName,
                                    lastName
                                },
                                JWT_SECRET_KEY,
                                {
                                    expiresIn: '1d'
                                }
                            )

                            res.send({
                                token
                            })
                        } else {
                            res.send({
                                message: 'Email or password is wrong!'
                            })
                        }
                    } else {
                        res.send({
                            message: 'Email or password is wrong!'
                        })
                    }
                })
        } catch (error) {
            console.log(error)
        }
    },
    signUp: async (req, res) => {
        try {
            await Users
                .findAll({
                    where: {
                        email: req.body.email
                    }
                })
                .then(async result => {
                    if (result.length > 0) {
                        res.send({
                            message: 'Email have been used!'
                        })

                        return null
                    } else {
                        const password = await hashPassword(req.body.password)

                        Users
                            .create({
                                id: null,
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                email: req.body.email,
                                password: password,
                                createdAt: null,
                                updatedAt: null
                            })
                            .then(result2 => {
                                res.send({
                                    message: 'User is successfully added.'
                                })
                            })
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }
}