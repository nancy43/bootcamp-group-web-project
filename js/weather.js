function weather() {

    var location = document.getElementById("location");
    var url = 'https://api.forecast.io/forecast/df7e69b54ab5704912f0b629815f2095/';

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        location.innerHTML = 'Latitude is ' + latitude + '° Longitude is ' + longitude + '°';

        $.getJSON(url + latitude + "," + longitude + "?callback=?", function(data) {
            $('#temp').html(((data.currently.temperature) - 32) * (0.56) + '° C');
            $('#wind').html('Wind Speed : ' + ((data.currently.windSpeed) * 1.6) + 'km/hr');
            $('#minutely').html(data.minutely.summary);
        });
    }

    function error() {
        location.innerHTML = "Sorry,Unable to retrieve your location";
    }

    location.innerHTML = "Searching location";
}

weather();