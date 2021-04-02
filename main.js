let temperature = document.querySelector(".temperature-degree");    
let zone =document.querySelector(".location-timezone");
let description = document.querySelector(".temperature-description");
let img = document.querySelector('img');

window.addEventListener('load', ()=>{

    let key ="e6feb0826433c88b4369dea3ecdda6f4"
    let long;
    let lat;
    let icona;
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( positon => {
            long = positon.coords.longitude;
            lat =  positon.coords.latitude;
            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${key}`;

            

            $.getJSON(api, function(data) {
                console.log(data.current.temp) // czasami odczytuje błędą temperature 
                 temperature.textContent = Math.round(data.current.temp - 273,15);
                 description.textContent =data.current.weather[0].description;
                 zone.textContent = data.timezone;
                 icona = data.current.weather[0].icon;
                 img.src = `http://openweathermap.org/img/wn/${icona}@2x.png`;
                 
                  if(data.current.weather[0].icon[2] == "n"){ //sprawdza pore dnia
                    document.body.classList.add('night');
                    document.body.classList.remove('day');
                  }
                  else{
                    document.body.classList.add('day');
                    document.body.classList.remove('night');
                  }

              }); 

        })

     }
   
})

