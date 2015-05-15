let express = require('express')
let fs = require('fs')
let request = require('request')
let cheerio = require('cheerio')
let app = express()
require('songbird')

app.get('/scrape', (req, res) => {
    let url = 'http://www.imdb.com/title/tt1229340/'
    async() => {
        try {
            let [, html] = await request.promise(url)
            let $ = cheerio.load(html)
                //get property via cheerio selectors
            let json = {
                    title: $('.header .itemprop').text(),
                    release: $('.header .nobr').children().text(),
                    rating: $('.titlePageSprite.star-box-giga-star').text()
                }
            //write to file
            await fs.promise.writeFile('output.json', JSON.stringify(json, null, 4))
            res.send('Check your console!')
        } catch (e) {
            console.log("error", e)
            res.send('error')
        }
    }()
})

app.listen('8081')
console.log('listen to 8081')
exports = module.exports = app
