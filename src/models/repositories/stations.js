const db = require("../../persistence/db");
const Station = require("../entities/station");

class Stations extends Array {
    async query() {
        let queryParams = [];

        let query = `
            SELECT * FROM stations
        `;

        const { rows } = await db.query(query, queryParams);
        rows.forEach((station) => this.push(new Station(station)));
    }
}

module.exports = Stations;
