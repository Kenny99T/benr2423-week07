let users;

class User {
	static async injectDB(conn) {
		users = await conn.db("vms").collection("users")
	}

	static async register(username, password) {
		// TODO: Check if username exists
		const user = await users.findOne({username: username})
		if (user != null) {
			return ("Username already exists");
		} else {
			const bcrypt = require("bcrypt");
			const salt = await bcrypt.genSalt(10);
			let user = {
				username: username,
				// TODO: Hash password
				password: bcrypt.hashSync(password, salt),
			}
			// TODO: Save user to database
			await users.insertOne(user);
			return ("User created");
		}
	}

	static async login(username, password) {
		// TODO: Check if username exists
		const users_check = await users.findOne({username: username});
		if (users_check != null) {
			const bcrypt = require("bcrypt");
			const pass = users_check.password;
			const compare = bcrypt.compareSync(password, pass);
			if(compare == true) {
				// TODO: Return user object
				return true;
			} else {
				return ("Incorrect password");
			}
		} else {
			return ("Username does not exist");
			// TODO: Validate password
		}
	}
	return
}
 module.exports = User;