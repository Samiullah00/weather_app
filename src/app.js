const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const weatherdata = require('../utils/weatherdata');



const publicpath = path.join(__dirname, '../public');
const viewspath = path.join(__dirname, '../templates/views');
const partialspath = path.join(__dirname, '../templates/partials');
const port = process.env.PORT || 3000


app.set('view engine', 'hbs');
app.set('views', viewspath);
hbs.registerPartials(partialspath);

app.use(express.static(publicpath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App'
    });
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: "You must enter the address"
        })
    }

    weatherdata(address, (error, { temprature, description, cityname } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        console.log(temprature, description, cityname);
        res.send({
            temprature,
            description,
            cityname
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found'
    })
})

app.listen(port, () => {
    console.log("Server running on port : ", port);
});