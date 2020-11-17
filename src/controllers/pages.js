const Page = require("../models/entities/page");
const Pages = require("../models/repositories/pages");

exports.getPages = async (req, res, next) => {
    let pages = new Pages();
    await pages.query();
    res.json({ pages: pages });
};

exports.getPage = async (req, res, next) => {
    let page = new Page();
    await page.query(req.params.pageId);
    res.json({ page: page });
};
