// switch innerHTML on change
function changeSwitchValue() {
    var f = "&#x2109;";
    var c = "&#x2103;";
    $('#cover').html(c);
    $('#unit_check').change(function() {
        if ($(this).prop("checked")) {
            $('#cover').html(f);
        } else {
            $('#cover').html(c);
        }
    });
}
//==========================================
function lastSync() {
    var str = "Last synced: ";
    var now = new Date();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var dayName = days[now.getDay()];
    var dayNum = now.getDate();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();
    var hour = now.getHours();
    var minute = now.getMinutes();
    str += dayName + " / " + dayNum + " / " + month + " / " + year + " / " + hour + ":" + minute;

    return str;
}

function showWeather() {
    $.getJSON("http://ipinfo.io/", function(location) {
        let apikey = "f1b48d918ebde30911a11d766e345632";
        var latLon = location.loc.split(","); // Longitute and Latitude
        var latitude = latLon[0];
        var longitude = latLon[1];
        var metric = "metric";
        var cityName = location.city;
        var country = location.country;

        var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=" + metric + "&APPID=" + apikey;

        //syncWeater(url);
        $.getJSON(url, function(response) {
        // city & state
        var city = cityName + ", " + country;
        // coords info
        var coordinates = "[ " + response.coord.lat + " -- " + response.coord.lon + " ]";
        // weather icon
        var iconUrl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        // weather caption
        var mainCaption = response.weather[0].main;
        var desc = $("<small class='caption-decs'></small>");
        desc.text(response.weather[0].description);
        // main temperature
        var tempt = Math.round(response.main.temp);
        var temptCelsius = true;

        // other wather conditions
        var windSpeed = "<b>Wind: </b>" + response.wind.speed + " m/s";
        var cloudiness = "<b>Cloudiness: </b>" + response.clouds.all + " %";
        var humidity = "<b>Humidity: </b>" + response.main.humidity + " %";
        // last sync
        var sync = lastSync();

        $('#wa-city').text(city); // city
        $('#user-coords').text(coordinates); // coords
        $('#wa-icon').attr('src', iconUrl); // icon
        $('#caption').text(mainCaption).append(desc); //weather description
        $('#wa-tempt').html(tempt + "&#x2103;"); // temperatura in celsius
        $('#wind').html(windSpeed); // wind speed
        $('#cloud').html(cloudiness); // percent of cloudiness
        $('#humi').html(humidity); // humidity percent
        $('#sync').text(sync); // last time sinced


        function toCelsius() {
            $('#wa-tempt').html(tempt + "&#x2103;");
            temptCelsius = true;
        }

        function toFarenheit() {
            var fahrenheit = Math.round(tempt * (9 / 5) + 32);
            $('#wa-tempt').html(fahrenheit + "&#x2109;");
            temptCelsius = false;
        }

        $('#check-label').click(function() {
            (temptCelsius) ? toFarenheit(): toCelsius();
        });
    });
    });
}





$(document).ready(function() {

    changeSwitchValue();
    showWeather();

});
