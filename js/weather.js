function weather() {

    var location = document.getElementById("location");
    var url = 'https://api.forecast.io/forecast/df7e69b54ab5704912f0b629815f2095/';

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        day = new Date()
        location.innerHTML = 'Latitude is ' + latitude + '° Longitude is ' + longitude + '°';

        $.getJSON(url + latitude + "," + longitude + "?callback=?", function(data) {
            $('#temp').html((data.currently.temperature) + '° F');
            $('#wind').html('Wind Speed: ' + ((data.currently.windSpeed) * 1.6) + 'km/h');
            $('#minutely').html(data.minutely.summary);
            $('#humidity').html('Humidity: ' + data.currently.humidity + '%');
            $('#precip').html('Precipitation: ' + data.currently.precipIntensity + '%');
            $('#timezone').html(data.timezone);
            $('#day').html(day);
            location.innerHTML = data.daily.summary;
        });
    }

    function error() {
        location.innerHTML = "Sorry,Unable to retrieve your location";
    }

    location.innerHTML = "Searching.....";
}

weather();