const axios = require("axios");
var express = require('express');
var router = express.Router();

router.post("/", function (req, res) {
    const address = req.body.Address
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyCea_aNWrtFKwa63zn0e3xpkpBTe2QYAFU')
        .then(function (response) {
            const format_addressz = response.data.results[0].formatted_address
            const lat = response.data.results[0].geometry.location.lat
            const lang = response.data.results[0].geometry.location.lng
            axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lang + '&exclude=minutely&appid=f6aa1e2d9c80701771d49c51fd8856ff&units=imperial')
                .then(function (response) {
                    const givenData = { first: format_addressz, second: response.data }
                    res.send(givenData)
                })
        })
});

module.exports = router;