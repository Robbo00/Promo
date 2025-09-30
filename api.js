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
    const { data } = await axios.get("https://www.beatsbydre.com/products")
    const $ = cheerio.load(data)
    let red = 0

    $(".product-slide").each((i, el) => {
      const name = $(el).find(".title-1").text().trim()
      const price = $(el).find(".product-detail__price").text().trim()
      const img = $(el).find("img").attr("src")
      
        console.log(price)
      products.push({
        name,
        price,
        img
      })    

    })
      res.json(products)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: "Failed to scrape data" })
  }
})



app.listen(PORT, () => {
  console.log(`✅ API running at http://localhost:${PORT}/api/beats`)
})
