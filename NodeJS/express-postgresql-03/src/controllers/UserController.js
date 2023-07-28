const db = require('../db/db')

class UserController {
    async createUser(req, res) {
        const {name, surname} = req.body
        const query = 'INSERT INTO "user" (name, surname) VALUES ($1, $2) RETURNING *';
        const data = [name, surname];
        const newPerson = await db.query(query, data)
        res.status(201).json(newPerson.rows[0])
    }

    async getUsers(req, res) {
        const users = await db.query('SELECT * FROM "user"')
        res.json(users.rows)
    }

    async getUser(req, res) {
        const id = req.params.id
        const user = await db.query('SELECT * FROM "user" WHERE id = $1', [id])
        res.json(user.rows[0])
    }

    async updateUser(req, res) {
        const {id, name, surname} = req.body
        const user = await db.query('UPDATE "user" SET name = $1, surname = $2 WHERE id = $3 RETURNING *', [name, surname, id])
        res.json(user.rows[0])
    }

    async deleteUser(req, res) {
        const id = req.params.id
        const user = await db.query('DELETE FROM "user" WHERE id = $1', [id])
        res.json(user.rows[0])
    }
}

module.exports = new UserController()