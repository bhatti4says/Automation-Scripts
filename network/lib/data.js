
import fs from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')
const productsPath = path.join(dataDir, 'products.json')
const usersPath = path.join(dataDir, 'users.json')

export function readJSON(p) {
  const raw = fs.readFileSync(p, 'utf-8')
  return JSON.parse(raw)
}

export function writeJSON(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2))
}

export function getAllProducts() {
  return readJSON(productsPath)
}

export function saveAllProducts(products) {
  writeJSON(productsPath, products)
}

export function getUsers() {
  return readJSON(usersPath)
}
