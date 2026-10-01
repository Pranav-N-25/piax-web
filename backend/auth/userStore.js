// User accounts. One small async interface, so the development store below can be replaced by the
// PostgreSQL/Prisma store (prisma/schema.prisma) without touching the routes.
//
// Development store: users kept in memory and saved to backend/.data/users.json (gitignored). It is refused in
// production, where local files are not durable (serverless) — set up the database store before launch.
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const { isProduction } = require('./config')

const FILE = path.join(__dirname, '..', '.data', 'users.json')

class StoreUnavailableError extends Error {}

let users = null
let writing = Promise.resolve()

function load() {
  if (isProduction) throw new StoreUnavailableError('The development user store is disabled in production. Configure the database store.')
  if (users) return users
  try {
    users = new Map(JSON.parse(fs.readFileSync(FILE, 'utf8')).map((user) => [user.id, user]))
  } catch {
    users = new Map()
  }
  return users
}

// Saves are queued so two quick writes never interleave; written to a temp file, then renamed into place.
function save() {
  const snapshot = JSON.stringify([...users.values()], null, 2)
  writing = writing.then(async () => {
    await fs.promises.mkdir(path.dirname(FILE), { recursive: true })
    const temp = `${FILE}.${process.pid}.tmp`
    await fs.promises.writeFile(temp, snapshot, { mode: 0o600 })
    await fs.promises.rename(temp, FILE)
  })
  return writing
}

const find = (test) => [...load().values()].find(test) ?? null

const userStore = {
  async findById(id) { return load().get(id) ?? null },
  async findByEmail(email) { return find((user) => user.email === email) },
  async findByPhone(phone) { return find((user) => user.phone === phone) },
  async findByProvider(provider, providerId) { return find((user) => user.providers?.[provider] === providerId) },

  async create(fields) {
    const now = new Date().toISOString()
    const user = {
      id: crypto.randomUUID(),
      name: '',
      email: null,
      emailVerified: false,
      phone: null,
      passwordHash: null,
      providers: {},
      role: 'customer',
      tokenVersion: 0,
      createdAt: now,
      lastLoginAt: now,
      ...fields,
    }
    load().set(user.id, user)
    await save()
    return user
  },

  async update(id, changes) {
    const user = load().get(id)
    if (!user) return null
    Object.assign(user, changes)
    await save()
    return user
  },
}

module.exports = { userStore, StoreUnavailableError }
