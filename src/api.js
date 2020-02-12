const express = require("express");
const serverless = require("serverless-http")

const fetch = require('node-fetch').default;

const HTMLParser = require('node-html-parser');


const app = express();

const router = express.Router();

app.use("/.netlify/functions/api", router)

router.get("/", (req, res) => {
    res.header('Access-Control-Allow-Origin', "*");

    getSynonym(req.query.q).then(synonyms => {
        res.send(synonyms)
    })
});


async function getSynonym(word) {
    if (!word) return;
    console.log("Checked word:", word);

    let response = await fetch(`https://cors-anywhere.herokuapp.com/https://www.sinonimos.com.br/${word}/`, {
        headers: { "X-Requested-With": "XMLHttpRequest" }
    });

    let html = await response.textConverted();
    let dom = HTMLParser.parse(html);

    let meanings = dom.querySelectorAll('.s-wrapper');

    let synonyms = {};
    let text;

    for (let i = 0; i < meanings.length; i++) {
        let len = meanings[i].childNodes.length;

        synonyms[len == 2 ? meanings[i].childNodes[0].rawText : `Sentido ${i + 1}`] = [];

        meanings[i].childNodes[len - 1].querySelectorAll(".sinonimo").forEach(s => {
            text = s.rawText
            if (text.match(/[A-Za-z_]/)) synonyms[len == 2 ? meanings[i].childNodes[0].rawText : `Sentido ${i + 1}`].push(s.rawText)
        });
    }
    return synonyms;
}

module.exports.handler = serverless(app);