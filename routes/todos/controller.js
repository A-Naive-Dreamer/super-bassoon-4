const { Todos } = require('../../db/models')

module.exports = {
    getAll: async (req, res) => {
        try {
            await Todos
                .findAll({})
                .then(result => {
                    res.status(200).send({
                        message: 'Get all datas.',
                        data: result
                    })
                })
        } catch (error) {
            console.log(error)
        }
    },
    getById: async (req, res) => {
        try {
            await Todos
                .findAll({
                    where: {
                        userId: parseInt(req.params.userId)
                    }
                })
                .then(result => {
                    res.send({
                        message: 'Get data by id.',
                        data: result
                    })
                })
        } catch (error) {
            console.log(error)
        }
    },
    getCompleted: async (req, res) => {
        try {
            await Todos
                .findAll({
                    where: {
                        userId: parseInt(req.params.userId),
                        status: 'completed'
                    }
                })
                .then(result => {
                    res.send({
                        message: 'Get completed datas.',
                        data: result
                    })
                })
        } catch (error) {
            console.log(error)
        }
    },
    getUncompleted: async (req, res) => {
        try {
            await Todos
                .findAll({
                    where: {
                        userId: parseInt(req.params.userId),
                        status: 'uncompleted'
                    }
                })
                .then(result => {
                    res.send({
                        message: 'Get uncompleted datas.',
                        data: result
                    })
                })
        } catch (error) {
            console.log(error)
        }
    },
    deleteOne: async (req, res) => {
        try {
            await Todos
                .update(
                    {
                        status: 'deleted'
                    },
                    {
                        where: {
                            id: parseInt(req.params.id),
                            userId: parseInt(req.params.userId)
                        }
                    }
                )
                .then(result => {
                    Todos
                        .findAll({
                            where: {
                                userId: parseInt(req.params.userId)
                            }
                        })
                        .then(result2 => {
                            res.send({
                                message: 'Data is successfully deleted.',
                                data: result2
                            })
                        })
                })
        } catch (error) {
            console.log(error)
        }
    },
    addOne: async (req, res) => {
        try {
            await Todos
                .create({
                    id: null,
                    userId: parseInt(req.params.userId),
                    todo: req.body.todo,
                    status: 'uncompleted',
                    createdAt: null,
                    updatedAt: null
                })
                .then(result => {
                    Todos
                        .findAll({
                            where: {
                                userId: parseInt(req.params.userId)
                            }
                        })
                        .then(result2 => {
                            res.send({
                                message: 'Data is successfully added.',
                                data: result2
                            })
                        })
                })
        } catch (error) {
            console.log(error)
        }
    },
    updateOne: async (req, res) => {
        try {
            await Todos
                .update(
                    {
                        todo: req.body.todo
                    },
                    {
                        where: {
                            id: parseInt(req.params.id),
                            userId: parseInt(req.params.userId)
                        }
                    }
                )
                .then(result => {
                    Todos
                        .findAll({
                            where: {
                                userId: parseInt(req.params.userId)
                            }
                        })
                        .then(result2 => {
                            res.send({
                                message: 'Data is successfully updated.',
                                data: result2
                            })
                        })
                })
        } catch (error) {
            console.log(error)
        }
    },
    setAsCompleted: async (req, res) => {
        try {
            await Todos
                .update(
                    {
                        status: 'completed'
                    },
                    {
                        where: {
                            id: parseInt(req.params.id),
                            userId: parseInt(req.params.userId)
                        }
                    }
                )
                .then(result => {
                    Todos
                        .findAll({
                            where: {
                                userId: parseInt(req.params.userId)
                            }
                        })
                        .then(result2 => {
                            res.send({
                                message: 'Data is successfully updated.',
                                data: result2
                            })
                        })
                })
        } catch (error) {
            console.log(error)
        }
    }
}