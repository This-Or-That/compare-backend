import express from "express";
import bodyParser from "body-parser";
import wikiLib from "wikijs";
const wiki = wikiLib.default;

const app = express();
app.use(bodyParser.json());

const cfg = {
    port: process.env.PORT || 8000,
};

app.get(`/api/v0/health`, (req, res) => {
    res.send({
	   ok: true,
    });
});

app.get(`/api/v0/comparison`, async (req, res) => {
    // Get random page
    const pageName = "Barak_Obama";//(await wiki().random())[0];
    const page = await wiki().page(pageName);

    return res.send({
	   page: page,
	   full_info: await page.fullInfo(),//page.content(),
    });
});

app.listen(cfg.port, () => {
    console.log(`listening on :${cfg.port}`);
});
