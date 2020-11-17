const db = require("../persistence/db");

module.exports = {
    async query(id) {
        let queryParams = [];
        let whereStatement = [];

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
        return rows;
    },
};
