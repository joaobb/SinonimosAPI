const express = require("express");
const serverless = require("serverless-http")

const fetch = require('node-fetch').default;

const HTMLParser = require('node-html-parser');

const app = express();

const router = express.Router();

router.get("/", (req, res) => {
    getSynonym(req.query.q).then(synonyms => {
        res.send(synonyms)
    })
});

app.use("/.netlify/functions/api", router)

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

    let meaning;
    let text;
    for (let i = 0; i < meanings.length; i++) {
        meaning = meanings[i];

        let len = meaning.childNodes.length;

        synonyms[len == 2 ? meaning.childNodes[0].rawText : `Sentido ${i + 1}`] = [];

        meaning.childNodes[len - 1].querySelectorAll(".sinonimo").forEach(s => {
            text = s.rawText
            if (text.match(/[A-Za-z_]/)) synonyms[len == 2 ? meaning.childNodes[0].rawText : `Sentido ${i + 1}`].push(s.rawText)
        });
    }
    return synonyms;
}


module.exports.handler = serverless(app);