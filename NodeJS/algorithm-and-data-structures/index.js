// Linear search
let array = [1, 4, 5, 8, 5, 1, 2, 7, 5, 2, 11]
let count = 0

function linearSearch(array, item) {
	for (let i = 0; i < array.length; i++) {
		count += 1
		if (array[i] === item) {
			return i
		}
	}

	return null
}

// console.log(linearSearch(array, 4))
// console.log('Count', count)

// Binary search

array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
count = 0

function binarySearch(array, item) {
	let start = 0
	let end = array.length
	let middle
	let found = false
	let position = -1
	while (!found && start <= end) {
		count += 1
		middle = Math.floor((start + end) / 2)
		if (array[middle] === item) {
			found = true
			position = middle
			return position
		}
		if (item < array[middle]) {
			end = middle - 1
		} else {
			start = middle + 1
		}
	}
	return position
}

function recursiveBinarySearch(array, item, start, end) {
	let middle = Math.floor((start + end) / 2)
	if (item === array[middle]) {
		return middle
	}
	if (item < array[middle]) {
		return recursiveBinarySearch(array, item, start, middle - 1)
	} else {
		return recursiveBinarySearch(array, item, middle + 1, end)
	}
}

// console.log('rec', recursiveBinarySearch(array, 13, 0, array.length))

// Selection sort

array = [
	0, 3, 2, 5, 6, 8, 1, 9, 4, 2, 1, 2, 9, 6, 3, 2, -1, 4, -5, 6, 23, 8, 9, 32
]

function selectionSort(array) {
	for (let i = 0; i < array.length; i++) {
		let indexMin = i
		for (let j = i + 1; j < array.length; j++) {
			if (array[j] < array[indexMin]) {
				indexMin = j
			}
		}
		let tmp = array[i]
		array[i] = array[indexMin]
		array[indexMin] = tmp
	}
	return array
}
// const a = selectionSort(arr)
// console.log(a)

// Bubble sort

array = [
	0, 3, 2, 5, 6, 8, 1, 9, 4, 2, 1, 2, 9, 6, 3, 2, -1, 4, -5, 6, 23, 8, 9, 32
]

function bubbleSort(array) {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length; j++) {
			if (array[j + 1] < array[j]) {
				let tmp = array[j]
				array[j] = array[j + 1]
				array[j + 1] = tmp
			}
		}
	}
}
// bubbleSort(array)
// console.log(array)

// Quick sort

function quickSort(array) {
	if (array.length <= 1) {
		return array
	}
	let pivotIndex = Math.floor(array.length / 2)
	let pivot = array[pivotIndex]
	let less = []
	let greater = []
	for (let i = 0; i < array.length; i++) {
		if (i === pivotIndex) {
			continue
		}
		if (array[i] < pivot) {
			less.push(array[i])
		} else {
			greater.push(array[i])
		}
	}
	return [...quickSort(less), pivot, ...quickSort(greater)]
}

// console.log(quickSort(array))

const graph = {}
graph.a = ['b', 'c']
graph.b = ['f']
graph.c = ['d', 'e']
graph.d = ['f']
graph.e = ['f']
graph.f = ['g']

function breadthSearch(graph, start, end) {
	let queue = []
	queue.push(start)
	while (queue.length) {
		const current = queue.shift()
		if (!graph[current]) {
			graph[current] = []
		}
		if (graph[current].includes(end)) {
			return true
		} else {
			queue = [...queue, ...graph[current]]
		}
	}
	return false
}

// console.log(breadthSearch(graph, 'a', 'n'))

// Dijkstra algorithm

graph.a = { b: 2, c: 1 }
graph.b = { f: 7 }
graph.c = { d: 5, e: 2 }
graph.d = { f: 2 }
graph.e = { f: 1 }
graph.f = { g: 1 }
graph.g = {}

function shortPath(graph, start, end) {
	const costs = {}
	const processed = []
	let neighbors = {}
	Object.keys(graph).forEach(e => {
		if (e !== start) {
			let value = graph[start][e]
			costs[e] = value || Number.MAX_VALUE
		}
	})
	let node = findNodeLowestCost(costs, processed)
	while (node) {
		const cost = costs[node]
		neighbors = graph[node]
		Object.keys(neighbors).forEach(n => {
			let newCost = cost + neighbors[n]
			if (newCost < costs[n]) {
				costs[n] = newCost
			}
		})
		processed.push(node)
		node = findNodeLowestCost(costs, processed)
	}
	return costs
}

function findNodeLowestCost(costs, processed) {
	let lowestCost = Number.MAX_VALUE
	let lowestNode
	Object.keys(costs).forEach(e => {
		let cost = costs[e]
		if (cost < lowestCost && !processed.includes(e)) {
			lowestCost = cost
			lowestNode = e
		}
	})
	return lowestNode
}

// console.log(shortPath(graph, 'a', 'g'))

const tree = [
	{
		v: 5,
		c: [
			{
				v: 10,
				c: [
					{
						v: 11
					}
				]
			},
			{
				v: 7,
				c: [
					{
						v: 5,
						c: [
							{
								v: 1
							}
						]
					}
				]
			}
		]
	}
]

function recursive(tree) {
	let sum = 0
	tree.forEach(node => {
		sum += node.v
		if (!node.c) {
			return node.v
		}
		sum += recursive(node.c)
	})
	return sum
}

// console.log(recursive(tree))

function iteration(tree) {
	if (!tree.length) {
		return 0
	}
	let sum = 0
	let stack = []
	tree.forEach(node => stack.push(node))
	while (stack.length) {
		const node = stack.pop()
		sum += node.v
		if (node.c) {
			node.c.forEach(child => stack.push(child))
		}
	}
	return sum
}
// console.log(iteration(tree))

// Cash

function cashFunction(fn) {
	const cash = {}
	return function (n) {
		if (cash[n]) {
			return cash[n]
		}
		let value = fn(n)
		cash[n] = value
		return value
	}
}

function factorial(n) {
	let result = 1
	while (n !== 1) {
		result *= n
		n -= 1
	}
	return result
}

// console.log(factorial(15))

// Linked list

class LinkedList {
	constructor() {
		this.size = 0
		this.root = null
	}

	add(value) {
		if (this.size === 0) {
			this.root = new Node(value)
			this.size += 1
			return true
		}
		let node = this.root
		while (node.next) {
			node = node.next
		}
		let newNode = new Node(value)
		node.next = newNode
		this.size += 1
	}

	getSize() {
		return this.size
	}

	print() {
		let result = []
		let node = this.root
		while (node) {
			result.push(node.value)
			node = node.next
		}
		console.log(result)
	}
}

class Node {
	constructor(value, prev, next) {
		this.value = value
		// this.prev = prev
		this.next = null
	}
}

// Binary tree

class BinaryTree {
	constructor() {
		this.root = null
	}

	add(value) {
		if (!this.root) {
			this.root = new TreeNode(value)
		} else {
			let node = this.root
			let newNode = new TreeNode(value)
			while (node) {
				if (value > node.value) {
					if (!node.right) {
						break
					}
					node = node.right
				} else {
					if (!node.left) {
						break
					}
					node = node.left
				}
			}
			if (value > node.value) {
				node.right = newNode
			} else {
				node.left = newNode
			}
		}
	}

	print(root = this.root) {
		if (!root) {
			return true
		}
		console.log(root.value)
		this.print(root.left)
		this.print(root.right)
	}
}

class TreeNode {
	constructor(value) {
		this.value = value
		this.left = null
		this.right = null
	}
}

// const bTree = new BinaryTree()

// bTree.add(5)
// bTree.add(2)
// bTree.add(6)
// bTree.add(2)
// bTree.add(1)

// bTree.print()

// Map Set

const objKey = { id: 5 }
const map = new Map()
map.set(objKey, 'vlad')

// console.log(map.get(objKey))

const set = new Set()

set.add(5)
set.add(5)
set.add(5)
set.add(5)
set.add(4)
set.add(2)
set.add(4)
set.add(1)

console.log(set)
