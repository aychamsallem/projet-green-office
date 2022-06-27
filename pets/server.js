const express = require('express')
const path = require('path')

const bodyparser = require('body-parser')

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
const PORT = 5050
const fs = require("fs")

app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(bodyparser.urlencoded({ extended: true }))
let animals = []
function example() {
  try {
    const data = fs.readFileSync("animals.txt", { encoding: "utf8" });
    return data;
  } catch (err) {
    console.log(err);
  }
  //return data;
}


// index page
app.get('/', function (req, res) {
  var items = Array("“Animals have come to mean so much in our lives. ...", 
  "“Life is what happens when you’re busy making other plans.”",
   " “You only live once, but if you do it right, once is enough.”",
    "“Never let the fear of striking out keep you from playing the game.”",
     "“In order to write about life first you must live it.”– Ernest Hemingway")
    var item = items[Math.floor(Math.random()*items.length)];
    console.log(item)
  var brand = 'PETS'
  var mascots = [
    { name: 'Association 1', organization: '/cute.jpg' },
    { name: 'Association 2', organization: '/cute1.png' },
    { name: 'Association 3', organization: '/cute2.jpg' }
  ]
  var tagline = item 
  res.render('pages/index', {
    mascots: mascots,
    tagline: tagline,
    brand: brand
  })
})

// animals page


app.get('/animals', function (req, res) {
  let monTitre = 'Ajouter un animal pour adoption'
let brand = "animaux"
  var quote = 'bla'

  if (fs.existsSync("animals.txt")) {
    animals = JSON.parse(example());
   
  }
  res.render('pages/animals', {
    animals: animals,
    brand:brand,
    monTitre: monTitre
  })
})




app.post('/animals', (req, res) => {
  let nom = req.body.nom
  let type =   req.body.type
  let imgURL =   req.body.url
  let anim = { nom: nom, type: type, url: imgURL }
  
  if (fs.existsSync("animals.txt")) {
    animals = JSON.parse(example());
   
  }
  animals.push(anim)
  let param = JSON.stringify(animals);
  fs.writeFileSync("animals.txt", param);
  res.redirect("/animals")


})




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
