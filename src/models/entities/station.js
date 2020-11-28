const db = require("../../persistence/db");
const { checkIfGuid } = require("../../utilities/generalUtilities");

class Station {
    constructor(data) {
        if (data) return this._set_Station(data);
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
                `WHERE station_id = $${queryParams.indexOf(id) + 1}`
            );
        }

        let query = `
            SELECT * FROM station
            ${whereStatement.join("")}
        `;

        const { rows } = await db.query(query, queryParams);

        if (rows.length == 0) {
            return new Promise((_, reject) =>
                reject({
                    status: 404,
                    message: "No Station with that ID Found",
                })
            );
        }

        return this._set_Station(rows[0]);
    }

    _set_Station(data) {
        this.station_name = data.station_name;
        this.station_slug = data.station_slug;
        this.station_url = data.station_url;
        this.station_id = data.station_id;

        return this;
    }
}

module.exports = Station;
