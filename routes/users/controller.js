const { Users } = require('../../db/models'),
    Op = require('sequelize').Op

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
                .findAll(
                    {
                        where: {
                            [Op.and]: [
                                {
                                    email: req.body.email
                                },
                                {
                                    password: req.body.password
                                }
                            ]
                        }
                    }
                )
                .then(result => {
                    if (result.length > 0) {
                        Users
                            .findAll(
                                {
                                    where: {
                                        [Op.and]: [
                                            {
                                                email: req.body.email
                                            },
                                            {
                                                password: req.body.password
                                            }
                                        ]
                                    },
                                    attributes: [
                                        'id',
                                        'firstName',
                                        'lastName'
                                    ]
                                }
                            )
                            .then(result2 => {
                                res.send({
                                    id: result2[0].id,
                                    firstName: result2[0].firstName,
                                    lastName: result2[0].lastName
                                })
                            })
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
                .then(result => {
                    if (result.length > 0) {
                        res.send({
                            message: 'Email have been used!'
                        })

                        return null
                    } else {
                        Users
                            .create({
                                id: null,
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                email: req.body.email,
                                password: req.body.password,
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