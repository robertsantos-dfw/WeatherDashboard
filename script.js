var inputValue = $(".inputValue");
var desc = $(".desc");
var temp = $(".temp");
var humidity = $(".humidity");
var windspeed = $(".windspeed");
var uvIndex = $(".uv");
var cities = [];



$(".btn").on("click", function(e) {
    e.preventDefault();
    let city = inputValue.val();

    getWeatherInfo(city)

});


function savedsearches() {
    localStorage.setItem("cities", JSON.stringify(cities))
}

function loadfromlocalcities() {
    JSON.parse(localStorage.getItem("cities"));
}

let allCities = JSON.parse(localStorage.getItem("cities"));
console.log(allCities)

function displaycities() {
    for (let i = 0; i < allCities.length; i++) {
        let list = $("<li>").addClass("row").css({ listStyleType: "none" });
        list.html(allCities[i])
        $("ul").prepend(list)
    }
}

displaycities()



function getWeatherInfo(city) {

    $.ajax(
        `https://api.openweathermap.org/data/2.5/weather?q=` +
        city +
        `&appid=fe25e99f2eabe262e23505065d0570b2`
    ).then((resp) => {
        console.log(resp);
        let citySearched = $("<div>").addClass("row").css({ textAlign: "left" });
        citySearched.text(`${resp.name} (${moment().format('LL')})`)

        $(".name").html(citySearched)
        temp.text(`Temp: ${resp.main.temp}`)
        humidity.text(`Humidity: ${resp.main.humidity}`)
        windspeed.text(`WindSpeed: "deg: "${resp.wind.deg}"speed: "${resp.wind.speed}`)
        uv.text(`UV: ${resp.main.uv}`)

        //verify if city exist in cities
        if (!cities.includes(resp.name)) {
            cities.push(resp.name)
            let newcity = $("<li>").addClass("row").css({ listStyleType: "none" });
            newcity.html(resp.name)
            $("ul").prepend(newcity)
        }

        savedsearches()


    });

}

// $.ajax(`https://api.openweathermap.org/data/2.5/uvi?lat=${resp.coord.lat}&lon=${resp.coord.lon}&appid=fe25e99f2eabe262e23505065d0570b2`)
//     .then(sencondresp => {
//             console.log(sencondresp)


// need to fetch data for 5 days, create new <div card> for each day with them data