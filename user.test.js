const MongoClient = require("mongodb").MongoClient;
const User = require("./user")
const { faker } = require('@faker-js/faker');
const username = faker.internet.userName();

describe("User Account", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:qOft08A8i6XRjFpt@sandbox.zy7nd.mongodb.net",
			{ useNewUrlParser: true },
		);
		User.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})

	test("New user registration", async () => {
		const res = await User.register(username, "123456")
		console.log(res)
		expect(res).toBe("User created")
	})

	test("Duplicate username", async () => {
		const res = await User.register("kenny", "123456")
		console.log(res)
		expect(res).toBe("Username already exists")
	})

	test("User login invalid username", async () => {
		const res = await User.login("kennyt", "123456")
		console.log(res)
		expect(res).toBe("Username does not exist")
	})

	test("User login invalid password", async () => {
		const res = await User.login("kenny", "654321")
		console.log(res)
		expect(res).toBe("Incorrect password")
	})

	test("User login successfully", async () => {
		const res = await User.login("kenny", "123456")
		console.log(res)
		expect(res).toBe(true)
	})

	test('should run', () => {
	});
});