var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputValue");
var name = document.querySelector(".name");
var desc = document.querySelector(".desc");
var temp = document.querySelector(".temp");
var humidity = document.querySelector(".humidity")
var windspeed = document.querySelector(".windspeed")
var uvIndex = document.querySelector(".uv")

button.addEventListener("click", function() {
    $.ajax(`https://api.openweathermap.org/data/2.5/weather?q=` + inputValue.value + `&appid=fe25e99f2eabe262e23505065d0570b2`)
        .then(resp => {
            console.log(resp)
            $.ajax(`https://api.openweathermap.org/data/2.5/uvi?lat=${resp.coord.lat}&lon=${resp.coord.lon}&appid=fe25e99f2eabe262e23505065d0570b2`)
                .then(sencondresp => {
                    console.log(sencondresp)

                    let forecast = data.weather
                    let nameValue = weather.name
                    let tempValue = weather.temp
                    let uvValue = weather.uvIndex

                    name.innerHTML = nameValue;
                    temp.innerHTML = tempValue;
                    desc.innerHTML = descValue;
                });

            let $card = $(
                `<div class="card" style="width: 18rem;">
                    <div class="card card-body " style="width: 18rem;">
                    <p> ${nameValue}</p>
                    <p> ${tempValue}</p>
                    <p> ${descValue}</p>
                    <p> ${uvValue}</p>
                    <ul id="list">

                    </ul>
                    <p> <a href="${(youtube1)}">Youtube Tutorial</a></p>
                    </div>
                    </div>`
            )
        });
    localStorage.setItem("name", JSON.stringify(name))
});

// need to fetch data for 5 days, create new <div card> for each day with them data

//this code is before adding 2nd response for lat and lon
// button.addEventListener("click", function() {
//     fetch(`https://api.openweathermap.org/data/2.5/weather/daily?q=` + inputValue.value + `&appid=fe25e99f2eabe262e23505065d0570b2`)
//         .then((response) => response.json())
//         .then((data) => console.log(data))
//         .then((data) => {
//             let nameValue = data["name"];
//             let tempValue = data["main"]["temp"];
//             let descValue = data["weather"][0]["description"];

//             name.innerHTML = nameValue;
//             temp.innerHTML = tempValue;
//             desc.innerHTML = descValue;
//         });
// });