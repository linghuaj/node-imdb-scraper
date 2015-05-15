let express = require('express')
let fs = require('fs')
let request = require('request')
let cheerio = require('cheerio')
let app = express()
require('songbird')

app.get('/scrape', (req, res) => {
    let url = 'http://www.imdb.com/title/tt1229340/'
    let json = {
        title: "",
        release: ""
    }
    async() => {
        try {
            let [, html] = await request.promise(url)
            // if you would like to see the full context of the html.
            // await fs.promise.writeFile('html.txt', html)
            let $ = cheerio.load(html)
            $('.header').filter(function() {
                let data = $(this)
                json.title = data.children().first().text()
                json.release = data.children().last().children().text()
            })
            await fs.promise.writeFile('output.json', JSON.stringify(json, null, 4))
            res.send('Check your console!')
        } catch (e) {
            console.log("error", e)
        }
    }()
})

app.listen('8081')
console.log('listen to 8081')
exports = module.exports = app
