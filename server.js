const express = require("express");
const fetch = require("node-fetch")
var HTMLParser = require('node-html-parser');

const app = express();

const port = 2048;

app.listen(port, () => {
    console.log("We are live on " + port)
})

app.get("/", (req, res) => {
    getSynonym(req.query.q).then(synonyms => {
        res.send(synonyms)
    })
})

async function getSynonym(word) {
    if (!word) return;
    console.log("Checked word:", word);

    // A huge thanks for the community behind of cors-anywhere
    let response = await fetch(`https://cors-anywhere.herokuapp.com/https://www.sinonimos.com.br/${word}/`, {
        headers: { "X-Requested-With": "XMLHttpRequest" }
    });

    // I'm not using response.text(), since it always convert the html to UTF-8
    let html = await response.textConverted()

    let dom = HTMLParser.parse(html)

    let meanings = dom.querySelectorAll('.s-wrapper')
    let synonyms = {}

    let meaning;
    for (let i = 0; i < meanings.length; i++) {
        meaning = meanings[i]

        let len = meaning.childNodes.length;

        synonyms[len == 2 ? meaning.childNodes[0].rawText : `Sentido ${i + 1}`] = []

        let text;
        meaning.childNodes[len - 1].querySelectorAll(".sinonimo").forEach(s => {
            text = s.rawText
            if (text.match(/[A-Za-z_]/)) synonyms[len == 2 ? meaning.childNodes[0].rawText : `Sentido ${i + 1}`].push(s.rawText)
        })
    }

    return synonyms
}