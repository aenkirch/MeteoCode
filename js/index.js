function getWeather(x, y){
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=ee0e3600522ee3d4797370d62a6550aa&lat="+x+"&lon="+y,
    Accept: "applications/json",
    success: function(data){
      //storing weather desc into a value bc we'll need it to change the img
      const texte = data.list[0].weather[0].description;
      
      $("#ville").html(data.city.name + ", " + data.city.country);
      $("#temperature").html(Math.floor(data.list[0].main.temp-273.15) + " °C");
      $("#temps").html(texte);
      
      //Default Value : Kelvin, what we want is °F or °C
      $("#temperature").click(function(){
        if ($(this).hasClass('F')) {
          $(this).html(Math.floor(data.list[0].main.temp*(9/5)-459.67) + " °F");     
        } else {
          $(this).html(Math.floor(data.list[0].main.temp-273.15) + " °C");
        }
        $(this).toggleClass('F')
      });
      
      //changing the img corresponding to the weather
      document.getElementById("animation").setAttribute("src", "https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png");
    }
  });
}

$("document").ready(function(){
  //we're using HTML5 geolocation
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      getWeather(position.coords.latitude, position.coords.longitude);
    });
  }
});