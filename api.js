// server.js
import express from "express"
import axios from "axios"
import * as cheerio from "cheerio"
    let products = []

const app = express()
const PORT = 3000
const { data } = await axios.get("https://www.beatsbydre.com/products", {headers: {'User-Agent': 'Mozilla/5.0'}})
    const $ = cheerio.load(data)
//route to scrape Beats products
app.get("/api/beats", async (req, res) => {
  try {
    // Creates arrays for the information
    let names = []
    let price = []
    let imgo = []
    let products = []
    // Goes through each card and gets the image src
    $(".product-slide").each((i, el) => {
      const img = $(el).find("img").attr("src")
      // const img = rawImg.startsWith("http") ? rawImg : `https://www.beatsbydre.com${rawImg}`
      imgo.push(img)
    })
    // Goes through each header and gets the name of the products
    $('.product-detail__title--new').each((i, el) => {
      names.push($(el).find('span').text().trim())
    })
    // Goes through and finds all the prices
    $('.product-detail__price').each((i, el) => {
      price.push($(el).find('span').text().trim())
    })
    
    //loops through and pushes the info to the poducts array
    for (let i = 0; i < names.length; i++) {
      let go = 'idk'

      for (let o = 0; o < products.length; o++) {
        if(names[i] == products[o].name){
          go = 'stop'
        }        
      }

      if(go == 'stop'){
        continue
      }

      //pattern to determine type by reading the image path
      let pattern = /(headphones)|(speakers)|(earbuds)|(cables)|(cases)/

      let triv = names[i].toLowerCase()

      triv = triv.replaceAll(/\s/g, '-')

      let reg = new RegExp(triv)

      let pImg = []

      console.log(triv)

      for (let i = 0; i < imgo.length; i++) {
        if(imgo[i].match(reg)){
          console.log('red')
          pImg.push(imgo[i])
          // imgo.splice(i, 1)
          // i--
        }        
      }
      let typ = imgo[i].match(pattern)
      // Pushes to products
      products.push({
        name:names[i],
        price:price[i],
        img:pImg,
        type:typ[0]
      })
    }
    //Outputs products
      res.json(imgo)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: "Failed to scrape data" })
  }
})





app.listen(PORT, () => {
  console.log(`✅ API running at http://localhost:${PORT}/api/beats`)
})


//Almost done finish tmr