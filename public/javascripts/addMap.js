document.addEventListener('DOMContentLoaded', () => {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
  });
  geolocalize().then(center => {
    map.setCenter(center);
    calcRoute()
  });
  const objConfigDR = {
    map
  }
  const directionsService = new google.maps.DirectionsService();
  const directionsDisplay = new google.maps.DirectionsRenderer( objConfigDR);
  function calcRoute() {
    const start = 'chicago, il';
    const end = 'amarillo, tx';
    const request = {
      origin:start,
      destination:end,
      travelMode: 'DRIVING'
    };
    directionsService.route(request, function(response, status) {
      console.log(status)
      console.log(response)
      if (status == 'OK') {
        console.log('okey')
        directionsDisplay.setDirections(response);
      }
    });
  }

  // const poly = new google.maps.Polyline({
  //   strokeColor: '#000000',
  //   strokeOpacity: 1.0,
  //   strokeWeight: 3
  // });
  // poly.setMap(map);

}, false);