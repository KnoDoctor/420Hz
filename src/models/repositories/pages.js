const db = require("../../persistence/db");
const Page = require("../entities/page");

class Pages extends Array {
    async query() {
        let queryParams = [];

        let query = `
            SELECT * FROM pages
        `;

        const { rows } = await db.query(query, queryParams);
        rows.forEach((page) => this.push(new Page(page)));
    }
}

module.exports = Pages;
