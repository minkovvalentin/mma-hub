const path = require('path');

const BASE_PATH = path.join(__dirname, 'src', 'server');

module.exports = {
	test: {
		client: 'pg',
		useNullAsDefault: true,
		// replace with own postgres username & password and database name for testing
		connection: 'postgres://username:password@localhost:5432/test_database',
		migrations: {
			directory: path.join(BASE_PATH, 'migrations')
		},
		seeds: {
			directory: path.join(BASE_PATH, 'seeds')
		},
		pool: {
			afterCreate: (conn, cb) => {
				conn.run('PRAGMA foreign_keys = ON', cb)
			}
		}
	},
	development: {
		client: 'pg',
		useNullAsDefault: true,
		// replace with own username & password and database name for development
		connection: 'postgres://username:password@localhost:5432/dev_database',
		migrations: {
			directory: path.join(BASE_PATH, 'migrations')
		},
		seeds: {
			directory: path.join(BASE_PATH, 'seeds')
		},
		pool: {
			afterCreate: (conn, cb) => {
				conn.run('PRAGMA foreign_keys = ON', cb)
			}
		}
	},
}
