// Importeer het npm pakket express uit de node_modules map
import express, { application, json } from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

app.use(express.urlencoded({extended: true }))

// Stel het oba profile in
const apiData = 'https://fdnd-agency.directus.app/items/oba_profile'

// Stel het oba profile in
const apiFamily = 'https://fdnd-agency.directus.app/items/oba_family'

// Stel het basis endpoint in
const apiUrl = 'https://fdnd-agency.directus.app/items/oba_item'

const apiItem = (apiUrl + 'oba_item')

// Home pagina
app.get('/', function(request, response) {
    fetchJson('https://fdnd-agency.directus.app/items/oba_item').then((items) => {
        response.render('index', {           
            items: items.data, /*hier zeg ik dat iedereen getoond moet worden*/
            savedItems: savedItems
        })
    });
})

// Boeken Pagina
app.get('/boeken', function(request, response) {
    fetchJson('https://fdnd-agency.directus.app/items/oba_item').then((itemsDataUitDeAPI) => {
        response.render('boeken', {
            
        })
    });
})

// Boeken ID (Pagina waar alle boeken zijn opgeslagen (zie het als favorieten lijst))
app.get('/boeken/:id', function(request, response) {
    fetchJson('https://fdnd-agency.directus.app/items/oba_item' + '?filter={"id":' + request.params.id + '}').then((itemsDataUitDeAPI) => {
        response.render('detail', {
            
        })
    });
})

// Array of object (ik weet niet specifiek welke) for POST om boeken op te slaan
let savedItems = [{name: "Lord of the rings And the fellowship of the ring", type: "book", id: "2"},
                  {name: "Lord of the rings The two towers", type: "book", id: "3"}, 
                  {name: "Het leven van een loser ", type: "book", id: "4"},
                  {name: "Percy Jackson en de Griekse goden", type: "book", id: "5"},
                  {name: "Vind je ikigai", type: "book", id: "6"},
                  {name: "Rich dad poor dad", type: "book", id: "7"},
                  {name: "Fantasia  / Geronimo Stilton", type: "book", id: "8"},
                  {name: "Maneki neko :Het Japanse geheim voor voorspoed en geluk", type: "book", id: "10"},
                  {name: "No Plan B", type: "book", id: "12"},
                  {name: "Murder on the Orient Express", type: "book", id: "20"},
                  {name: "The Da Vinci Code", type: "book", id: "26"},
                  {name: "It ends with us", type: "book", id: "31"},
                  {name: "Too Late", type: "book", id: "32"},
];

// Ik weet toch niet zeker hoe ik verder moet 

  
// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
});