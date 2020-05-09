const API_KEY = 'd331f2554c1fc49908a3d0547c063624';
const ABS_TMP_DIFF = 273;

$(function() {
  var formSpinner = $('#form-spinner');
  var formError = $('#form-error');
  var formResult = $('#form-result');
  $('#weather-form').on('submit', function(e) {
    formSpinner.css('display', 'inline');
    var cityName = $(this).find('#weather-form-city').prop('value');
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
    requestUrl += cityName + '&APPID=' + API_KEY;
    $.ajax(requestUrl)
      .done(function(data) {
        if (data.cod == 200) {
          formSpinner.css('display', 'none');
          formError.css('display', 'none');
          $('#result-city-name').text(data.name);
          $('#result-temp').text(Math.round(data.main.temp - ABS_TMP_DIFF));
          $('#result-weather').text(data.weather[0].main);
          $('#result-datetime').text(Date(data.dt));
          formResult.css('display', 'block');
        } else {
          formSpinner.css('display', 'none');
          formError.css('display', 'block');
          formResult.css('display', 'none');
        }
      })
      .fail(function() {
        formSpinner.css('display', 'none');
        alert('Something wrong occurred.');
      });
    e.preventDefault();
  });
});


// const API_KEY = 'd331f2554c1fc49908a3d0547c063624'


// $(function() {
//   $('#weather-form').on('submit', function(e) {
//     var cityName = $(this).find('#weather-form-city').prop('value');
//     $.ajax('http://api.openweathermap.org/data/2.5/weather?APPID=' + API_KEY + '&q=' + cityName)
//       .done(function(data) {
//         $('#form-error').css('display', 'none');
//         $('#result-city-name').text(data.name);
//         $('#result-temp').text(Math.round(data.main.temp - 273));
//         $('#result-weather').text(data.weather[0].main);
//         $('#result-datetime').text(Date(data.dt));
//         $('#form-result').css('display', 'block');
//       })
//       .fail(function(data) {
//         $('#form-spinner').css('display', 'none');
//         alert('Something wrong occurred.');
//       });
//     e.preventDefault();
//   });
// });
