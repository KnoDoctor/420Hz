const { Router } = require("express");
const Page = require("../models/pages");

const router = new Router();

router.get("/", async (request, response) => {
    try {
        const page = await Page.query();
        return response.status(200).json({ pages: page });
    } catch (error) {
        console.error(`Find Pages failed`);
        response.status(500).json();
    }
});

router.get("/:pageId", async (request, response) => {
    try {
        const page = await Page.query(request.params.pageId);
        return response.status(200).json({ pages: page });
    } catch (error) {
        console.error(`Find Page failed`);
        response.status(500).json();
    }
});

module.exports = router;
