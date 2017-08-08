
  var api = "https://fcc-weather-api.glitch.me/api/current?";
  var lat, lon;
  var tempUnit = 'Celcius';
  var currentTempInCelsius;
  var sentence = "<span id=\"city\"></span>, <span id=\"country\"></span> is currently <span class=\"underline\" id=\"temp\"></span>˚ <span id=\"tempunit\">Celcius</span> and the weather condition is <span class=\"underline\" id=\"desc\"></span>. Wind speed is <span class=\"underline\" id=\"speed\"></span> km/h."

  $(document).ready(function(){


  // FCC WEATHER API


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat="lat="+position.coords.latitude;
      var lon="lon="+position.coords.longitude;
      getWeather(lat, lon);
    });
  }
  $("#toggle").click(function () {
    var currentTempUnit = $("#tempunit").text();
    var newTempUnit = currentTempUnit == "Celcius" ? "Fahrenheit" : "Celcius";
    if (newTempUnit == "Fahrenheit") {
      var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      $("#temp").text(fahTemp);
      $("#tempunit").text(newTempUnit);
      $('#toggle').html("Celcius/<strong>Fahrenheit</strong>")

    } else {
      $("#temp").text(currentTempInCelsius);
      $("#tempunit").text(newTempUnit);
      $('#toggle').html("<strong>Celcius</strong>/Fahrenheit")

    }
  });

  });

  function getWeather(lat, lon) {
  var urlString = "https://fcc-weather-api.glitch.me/api/current?" + lat + "&" + lon;
  $.ajax({
    url: urlString, success: function (result) {
      currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
      var speed = result.wind.speed;
      var desc = result.weather[0].main;
      if (currentTempInCelsius>18 && speed<10 && desc!== "Rain") {
        sentence+=" You don't need a jacket.";
      } else {
        sentence+=" You should probably wear a jacket.";
      }
      $('.weathertext').html(sentence);
      $("#city").text(result.name);
      $("#country").text(result.sys.country);
      $("#temp").text(currentTempInCelsius);
      $("#tempunit").text(tempUnit);
      $("#desc").text(desc);
      $("#speed").text(speed);
      getWall(desc)
    }
  });
}

  function getWall(query) {
    var wdata = 'dark,'+query;
    // UNSPLASH API
    if (query === "Clear") {
      var cURL = 'https://api.unsplash.com/photos/random/?client_id=cfe83d0d0111ded41f664d1de5b94ecf0551c60acdc56acd176fb9ed246bb81e&query=dark,weather';
    } else {
      var cURL = 'https://api.unsplash.com/photos/random/?client_id=cfe83d0d0111ded41f664d1de5b94ecf0551c60acdc56acd176fb9ed246bb81e'+'&query="'+wdata+'"';
    }
    var imgoutput = $.ajax({
    url: cURL,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      image = data.urls.regular;
      author = data.user.name;
      profile = data.user.username;
      $('body').css('background-image',"url("+image+")");
      $('.auth').html(author)
      $(".auth").attr("href", "https://unsplash.com/@"+profile+"?utm_source=LocalWeather&utm_medium=referral&utm_campaign=api-credit")
    },
  });
  }
