const   express = require('express'),
        app = express(),
        PORT = 8000,
        request = require('request'),
        bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    request('https://pokeapi.co/api/v2/pokemon?offset=0&limit=964', (error, response, body) => {
        if(!error && response.statusCode == 200){
            let info = JSON.parse(body);
            res.render('index', {info: info});
        }
    })
})

app.post('/pokeVal', (req, res) => {
    let a = req.body;
    
    for(let k in a ){
        request(`https://pokeapi.co/api/v2/pokemon/${a[k]}/`, (error, response, body) => {
            if(!error && response.statusCode == 200){
                let info = JSON.parse(body);
                res.render('poke', {info: info});
            }
        })
    }
    
    // let b = parseInt(a);
    // console.log(b);

 
    // let s = a[0] + "";
    // let b = parseInt(s);
    // console.log(b);
   
})

app.listen(PORT, () => {
    console.log('server is listening on port ' + PORT);
})