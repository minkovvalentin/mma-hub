//routes.test.js
const request = require('supertest');
const server = require('../src/app.js');
beforeAll(async () => {
	// do something before anything else runs
	console.log('Jest starting!');
});
// close the server after each test
afterAll(() => {
	server.close();
	console.log('server closed!');
});
describe('basic route tests', () => {
	test('get home route GET /fighters', async () => {
		const response = await request(server).get('/fighters');
		expect(response.status).toEqual(200);
	});
});