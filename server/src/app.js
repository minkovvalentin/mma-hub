const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const dotenv = require('dotenv');
const indexRoutes = require('./server/routes/index');
const Knex = require('knex');
const knexConfig = require('../knexfile');
const { Model, ForeignKeyViolationError, ValidationError } = require('objection');

// Initialize knex.
const knex = Knex(knexConfig.development)

const app = new Koa();

const env = dotenv.config();

const PORT = process.env.PORT || 3007;

// Bind all Models to a knex instance.
Model.knex(knex)

app.use(errorHandler);
app.use(bodyParser());
app.use(logger());
app.use(indexRoutes.routes());
const server = app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});

// Error handling.
//
// NOTE: This is not a good error handler, this is a simple one. See the error handing
//       recipe for a better handler: http://vincit.github.io/objection.js/#error-handling
async function errorHandler(ctx, next) {
	try {
		await next()
	} catch (err) {
		if (err instanceof ValidationError) {
			ctx.status = 400
			ctx.body = {
				error: 'ValidationError',
				errors: err.data
			}
		} else if (err instanceof ForeignKeyViolationError) {
			ctx.status = 409
			ctx.body = {
				error: 'ForeignKeyViolationError'
			}
		} else {
			ctx.status = 500
			ctx.body = {
				error: 'InternalServerError',
				message: err.message || {}
			}
		}
	}
}

module.exports = server;
