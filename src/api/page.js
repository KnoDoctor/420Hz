const { Router } = require("express");

const { getPages, getPage } = require("../controllers/pages");

const router = new Router();

let wrapAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

router.get(
    "/",
    wrapAsync(async (req, res, next) => getPages(req, res, next))
);

// router.get("/", async (req, res, next) => {
//     try {
//         const page = await Page.query();
//         return response.status(200).json({ pages: page });
//     } catch (error) {
//         console.error(`Find Pages failed`);
//         response.status(500).json();
//     }
// });

router.get(
    "/:pageId",
    wrapAsync(async (req, res, next) => getPage(req, res, next))
);

module.exports = router;
