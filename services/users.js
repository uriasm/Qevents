const MongoLib = require("../lib/mongo");
const bcrypt = require("bcrypt");

class UserService {
    constructor() {
        this.collection = "users";
        this.mongoDB = new MongoLib();
    }

    async createUser({user}) {
        const pass = await bcrypt.hash(user.password, 10);
        user.password = pass;
        const createdUserId = await this.mongoDB.create(this.collection, user);

        return createdUserId;
    }

    async hasEmailUser(email) {
        const users = await this.mongoDB.getAll("users", {
            email: email
        });

        return users && users.length;
    }

}

module.exports = UserService;