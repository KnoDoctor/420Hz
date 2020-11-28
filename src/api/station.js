const { Router } = require("express");

const { getStations, getStation } = require("../controllers/stations");

const router = new Router();

let wrapAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

router.get(
    "/",
    wrapAsync(async (req, res, next) => getStations(req, res, next))
);

router.get(
    "/:stationId",
    wrapAsync(async (req, res, next) => getStation(req, res, next))
);

module.exports = router;
