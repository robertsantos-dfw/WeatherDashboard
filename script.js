var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputValue");
var name = document.querySelector(".name");
var desc = document.querySelector(".desc");
var temp = document.querySelector(".temp");

button.addEventListener("click", function() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=` + inputValue.value + `&appid=fe25e99f2eabe262e23505065d0570b2`)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .then((data) => {
            let nameValue = data["name"];
            let tempValue = data["main"]["temp"];
            let descValue = data["weather"][0]["description"];

            name.innerHTML = nameValue;
            temp.innerHTML = tempValue;
            desc.innerHTML = descValue;
        });
});

localStorage.setItem("name", JSON.stringify(name))

// need to fetch data for 5 days, create new <div card> for each day with them data