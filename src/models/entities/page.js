const db = require("../../persistence/db");
const { checkIfGuid } = require("../../utilities/generalUtilities");

class Page {
    constructor(data) {
        if (data) return this._set_Page(data);
    }

    async query(id) {
        let queryParams = [];
        let whereStatement = [];

        if (!checkIfGuid(id)) {
            return new Promise((_, reject) =>
                reject({ status: 404, message: "Please enter a valid UUID" })
            );
        }

        if (id) {
            queryParams.push(id);
            whereStatement.push(
                `WHERE page_id = $${queryParams.indexOf(id) + 1}`
            );
        }

        let query = `
            SELECT * FROM pages
            ${whereStatement.join("")}
        `;

        const { rows } = await db.query(query, queryParams);

        if (rows.length == 0) {
            return new Promise((_, reject) =>
                reject({ status: 404, message: "No Page with that ID Found" })
            );
        }

        return this._set_Page(rows[0]);
    }

    _set_Page(data) {
        this.page_name = data.page_name;
        this.page_slug = data.page_slug;
        this.page_id = data.page_id;

        return this;
    }
}

module.exports = Page;
