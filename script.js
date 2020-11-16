let cName = "Waco";
let cTemp = "";
let cWind = "";
let cUV = "";
let cIcons = "";
let cHumidity = "";
let cities = [];
let apiKey = 'fe25e99f2eabe262e23505065d0570b2'

localSearchsvd()
getWeatherInfo()
fiveDay()

// // search button
// $(".btn").on("click", function(e) {
//     e.preventDefault();
//     let city = inputValue.val();
//     console.log(inputValue.val())
//     getWeatherInfo(city);
// });

function getWeatherInfo() {

    let today = moment().format("MM/D/YY");
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cName}&units=imperial&appid=${apiKey}`
    $.ajax({
        url: queryURL
    }).then(resp => {

        $.ajax(`https://api.openweathermap.org/data/2.5/uvi?lat=${resp.coord.lat}&lon=${resp.coord.lon}&appid=${apiKey}`)
            .then(uvResp => {
                let uvData = `<p>UV Index: ${uvResp.value} </p>`
                $("#mainData").append(uvData)
            })
        cName = resp.name;
        cTemp = resp.main.temp;
        cWind = resp.wind.speed;
        cHumid = resp.main.humidity;
        //setting weather icon for the img src link below
        cIcons = response.weather[0].icon;
        let mainData = `<h2>${cName} (${today})<img src="http://openweathermap.org/img/w/${cIcons}.png"></img></h2>
                            <p>Temperature: ${cTemp} °F</p>
                            <p>Humidity: ${cHumid}%</p>
                            <p>Wind Speed: ${cWind} MPH</p>
                           `
            //appending the main city data                   
        $("#mainData").append(mainData)

    });

};



//getting the five day forecast
function fiveDay() {
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cName}&cnt=0&units=imperial&appid=${apiKey}&units=imperial`
    $.ajax({
        url: queryURL
    }).then(forecast => {
        for (let i = 0; i < 40; i += 8) {
            fDate = (forecast.list[i].dt_txt).slice(0, -8)
            fTemp = forecast.list[i].main.temp
            fIcon = forecast.list[i].weather[0].icon
            fHumid = forecast.list[i].main.humidity
            let cardData = `<div class="card mx-1 border-light bg-primary rounded" style="width: 10rem;">
                              <div class="card-body  text-white">
                               <h5 class="card-title">${fDate}</h5>
                               <p class="card-text"><img src="http://openweathermap.org/img/w/${fIcon}.png"></img></p>
                               <p class="card-text">Temp: ${fTemp} °F</p>
                               <p class="card-text">Humidity: ${fHumid}%</p>
                              </div>
                            </div>`
                //appending each card built in the 5 day 
            $("#forecast").append(cardData)
        }
    });

}

function localSearchsvd() {
    //clear li elements so theres no repeats
    $("#searchhistory").empty();
    for (let i = 0; i < cities.length; i++) {
        const city = cities[i]
        let cityList = `<li id="list" class="list-group-item list-group-item-action">${city}</li>`
        $("#searchhistory").prepend(cityList)
    }
};

//when search button is clicked, the main data and forecast are emptied out to prevent multiples 
$("#srchbtn").on("click", function(event) {
    event.preventDefault();
    cName = $("#city").val();
    cities.push(cName)

    buildList();
    $("#forecast").empty();
    $("#mainData").empty();
    cityWeather(cName);
    fiveDay(cName);
    //setting local storage to save users search history.
    localStorage.setItem("cities", JSON.stringify(cities));

});

function init() {
    //local storage set up 
    let citiesSaved = JSON.parse(localStorage.getItem("cities"));
    //if nothing has be saved yet, use origial cities array otherwise use citiesSaved array
    if (citiesSaved !== null) {
        cities = citiesSaved;
    }
    // Render search history
    buildList();
}
//so user can pull a city they have already searched for without typing.
$("li").on('click', function(event) {
    event.preventDefault();
    let histSearch = $(this).closest("#list").text()
    console.log(histSearch)
    cityName = histSearch
    $("#forecast").empty();
    $("#mainData").empty();
    cityWeather(cityName);
    fiveDay(cityName);
})