const supertest = require('supertest');
const request = supertest('http://localhost:3000');

describe('Express Route Test', function () {
	it('login successfully', async () => {
		return request
			.post('/login')
			.send({username: "kenny", password: "123456" })
			.expect('Content-Type', /text/)
			.then(res => {
				expect(res.text).toBe("Login successfully");
				console.log(res.text);
			});
	});

	it('login failed', async () => {
		return request
			.post('/login')
			.send({username: 'kenny', password: "1234567" })
			.expect('Content-Type', /text/)
			.then (res => {
				expect(res.text).toBe('Incorrect username or password');
				console.log(res.text);
			});
	});


	it('register', async () => {
		return request
			.post('/register')
			.send({username: 'ali', password: "123456" })
			.expect('Content-Type', /text/)
			.then (res => {
				expect(res.text).toBe("register successfully");
				console.log(res.text);
			}
		);
	});

	it('register failed', async () => {
		return request
			.post('/register')
			.send({username: 'kennytan', password: "123456" })
			.expect('Content-Type', /text/)
			.then (res => {
				expect(res.text).toBe("Failed, username already exists");
				console.log(res.text);
			}
		);
	})
});