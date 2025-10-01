// server.js
import express from "express"
import axios from "axios"
import * as cheerio from "cheerio"
    let products = []

const app = express()
const PORT = 3000

// Example route to scrape Beats products
app.get("/api/beats", async (req, res) => {
  try {
    const { data } = await axios.get("https://www.beatsbydre.com/products", {headers: {'User-Agent': 'Mozilla/5.0'}})
    const $ = cheerio.load(data)
    let names = []
    let price = []
    let imgo = []
    let products = []
    $(".product-slide").each((i, el) => {

      const img = $(el).find("img").attr("src")
      // const img = rawImg.startsWith("http") ? rawImg : `https://www.beatsbydre.com${rawImg}`
      imgo.push(img)

    })

    $('.product-detail__title--new').each((i, el) => {
      names.push($(el).find('span').text().trim())
    })

    $('.product-detail__price').each((i, el) => {
      price.push($(el).find('span').text().trim())
    })

    for (let i = 0; i < names.length; i++) {
      let pattern = /(headphones)|(speakers)|(earbuds)|(cables)|(cases)/
      let typ = imgo[i].match(pattern)
      products.push({
        name:names[i],
        price:price[i],
        img:imgo[i],
        type:typ[0]
      })
    }

      res.json({n:names.length, i:imgo.length, p:price.length})
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: "Failed to scrape data" })
  }
})



app.listen(PORT, () => {
  console.log(`✅ API running at http://localhost:${PORT}/api/beats`)
})


//Almost done finish tmr