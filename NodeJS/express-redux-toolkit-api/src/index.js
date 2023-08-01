const express = require('express')
const recipes = require('./db.js')
const cors = require('cors')
const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

//create a get endpoint for /api/recipes to get recipes
app.get('/api/recipes', (req, res) => {
	const name = req.query.name
	if (!name) {
		return res.json(recipes)
	}
	const filteredRecipes = recipes.filter(recipe =>
		recipe.name.toLowerCase().includes(name.toLowerCase())
	)
	res.json(filteredRecipes)
})

app.post('/api/recipes', (req, res) => {
	console.log(req.body)
	const recipe = {
		...req.body,
		id: recipes.length + 1
	}
	console.log(recipe)
	recipes.push(recipe)
	res.json(recipe)
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
