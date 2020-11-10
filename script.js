var button = document.querySelector(".button")
var inputValue = document.querySelector(".inputValue")
var name = document.querySelector(".name")
var desc = document.querySelector(".desc")
var temp = document.querySelector(".temp")

button.addEventListener("click", function() {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=` + inputValue.value + `&units=imperial` + `&appid=218d741e070c3405fc59e124350e93ca`)
        .then(response => response.json())
        .then(data => console.log(data))
        .then(data => {
            var nameValue = data["name"];
            var tempValue = data["main"]["temp"];
            var descValue = data["weather"][0]["description"];

            name.innerHTML = nameValue;
            temp.innerHTML = tempValue;
            desc.innerHTML = descValue;
        })

    .catch(err => alert("Wrong City Name!"))
})



// $document.ready(function() {
//     $(".button").click(function() {

//         var city = $("#city").val();
//         if (city != "")[
//             $.ajax({
//                 url: `https://api.openweathermap.org/data/2.5/weather?q=` + inputValue.value + `&units=imperial` + `&appid=218d741e070c3405fc59e124350e93ca`,
//                 type: "GET",
//                 dataType: "jsonp",
//                 success: function(data) {
//                     console.log(data);
//                 }
//             })
//         ]
//         else {
//             $("error").html("Wrong City Name!");
//         }
//     });



// })