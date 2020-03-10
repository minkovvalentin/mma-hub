const Router = require('koa-router');
const router = new Router();

const Fighter = require('../models/Fighter');
const User = require('../models/User');

const fighterService = require('../../services/fighterService');

router.get('/fighters', async (ctx) => {
	const query = Fighter.query();

	if (ctx.query.select) {
		query.select(ctx.query.select)
	}

	fighterService.getAllFighters();
	ctx.body = await query;
});

module.exports = router;
