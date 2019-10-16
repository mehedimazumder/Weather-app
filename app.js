window.addEventListener('load', ()=>{
  let long;
  let lat;
  let temparatureDescription = document.querySelector('.temparature-description');
  let temparatureDegree = document.querySelector('.temparature-degree');
  let locationTimezone = document.querySelector(".location-timezone");
  let degreeTemp = document.querySelector(".degree-temparature");
  let spanTemp = document.querySelector(".degree-temparature span");

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/62cd1c21c6c51ce30b034ad45f52c41a/${lat},${long}`;
      fetch(api)
        .then(data => {
          return data.json();
        })
        .then(data => {
          console.log(data);
          const {temperature, summary, icon} = data.currently;
          //set DOM Elements from the api
          temparatureDegree.textContent = temperature;
          temparatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          //icon
          setIcons(icon, document.querySelector(".icon"));
          //celcius convert
          celcius(temperature);

        });
    });

    function setIcons(icon, iconID){
      const skycons = new Skycons({color: "white"});
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconID, Skycons[currentIcon]);
    }

    function celcius(temperature){
      let celciusTemp = (temperature -32) * (5 / 9);

      return degreeTemp.addEventListener('click', () => {
        if(spanTemp.textContent === "F") {
          spanTemp.textContent = "C";
          temparatureDegree.textContent = Math.floor(celciusTemp);
        } else {
          spanTemp.textContent = "F";
          temparatureDegree.textContent = temperature;
        }
      });
    }
  }
})
