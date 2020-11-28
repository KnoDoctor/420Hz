const Station = require("../models/entities/station");
const Stations = require("../models/repositories/stations");

exports.getStations = async (req, res, next) => {
    let stations = new Stations();
    await stations.query();
    res.json({ stations: stations });
};

exports.getStation = async (req, res, next) => {
    let station = new Station();
    await station.query(req.params.stationId);
    res.json({ station: station });
};
