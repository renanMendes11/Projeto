  //Guardando e selecionando os respectivos ids
  var city = document.querySelector('#city');
  var btnPesquisa = document.querySelector('#btnpesquisa');
  var info = document.querySelector('#info');
  var map;



  //Criando evnto para o botão e a chamada da api Weather que retorna um JSON 
  btnPesquisa.addEventListener('click', () => {
    var regex = /\D/g;
    getWeather({
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city.value},uk&appid=3ba7fda56619fd7372f2e655dda1bc73&lang=pt&units=metric`,
      successful: function(){
        let Clima = JSON.parse(xhr.responseText);
        if(regex.test(city.value)){
          error.innerHTML = '';
          img.innerHTML = '';
          console.log(Clima);
          exibeInfo(Clima);
        }else {
          error.innerHTML = '<b><p>Apenas nome de cidades</p><b>';
          error.style.color = 'red';
          img.innerHTML = '<img src="img/Exclamacao-vermelha.png"/> '
          console.log("error");
        }
      }
    });
  }, false);


  //Função que pega os valores que o JSON retorna
  function exibeInfo(Clima){
    info.innerHTML = '';
    info.innerHTML += `<h4>${Clima.name}</h4>`;
    info.innerHTML += `<p>Latitude: <b>${Clima.coord.lat}</b></p>`;
    info.innerHTML += `<p>Longitude: <b>${Clima.coord.lon}</b></p>`;
    info.innerHTML += `<p>País: <b>${Clima.sys.country}</b></p>`;
    info.innerHTML += `<p>Vento: <b>${Clima.wind.speed} Mi/h</b></p>`;
    info.innerHTML += `<p>Tempo: <b>${Clima.weather[0].main}</b></p>`;
    info.innerHTML += `<p>Descrição: <b>${Clima.weather[0].description}</b></p>`;
    info.innerHTML += `<p>Humidade: <b>${Clima.main.humidity}</b></p>`;
    info.innerHTML += `<p>Temperatura Média: <b>${Clima.main.temp}</b></p>`;
    info.innerHTML += `<p>Temperatura Maxima: <b>${Clima.main.temp_max}</b></p>`;
    info.innerHTML += `<p>Temperatura Mínima: <b>${Clima.main.temp_min}</b></p>`;
     initMap(Clima);
  }
  
  //Função que chama a api maps google
  function initMap(Clima) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat:  Clima.coord.lat, lng: Clima.coord.lon},
      zoom: 8
    });
    // Biblioteca da api maps google (Drawing)
    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.MARKER,
          google.maps.drawing.OverlayType.CIRCLE,
          google.maps.drawing.OverlayType.POLYGON,
          google.maps.drawing.OverlayType.POLYLINE,
          google.maps.drawing.OverlayType.RECTANGLE
        ]
      },
    markerOptions: {icon: 'images/beachflag.png'},
    circleOptions: {
      fillColor: '#ffff00',
      fillOpacity: 1,
      strokeWeight: 5,
      clickable: false,
      editable: true,
      zIndex: 1
    }
  });
  drawingManager.setMap(map);
}


  //AJAX
  function getWeather({
    method = 'get',
    url = '',
    data = null,
    successful = null
  }){
    xhr = new XMLHttpRequest();
    xhr.onload = successful;
    xhr.open(method, url, true);
    xhr.send();
  }
