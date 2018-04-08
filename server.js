const express   =   require('express');
const hbs       =   require('hbs');
const fs        =   require('fs');

var app     =   express();
var port    =   process.env.port || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err)
            console.log('unable to write log to file');
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page',
//         welcomeMessage: 'Site is under maintenance!',
//         currentYear: new Date().getFullYear()
//     })
// })

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamit', (text) => {
    return text.toUpperCase();
});

app.get('/about', (request, response) => {
    // response.send('<h1>About</h1>');
    response.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    })
});

app.get('/', (request, response) => {
    // response.send('<h1>About</h1>');
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to Sami\'s website',
        currentYear: new Date().getFullYear()
    })
});

app.get('/bad', (request, response) => {
    response.send({
        errorMesage: 'unable to render this data'
    });
});

app.listen(port); //port 3000