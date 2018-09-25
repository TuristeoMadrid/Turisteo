document.addEventListener('DOMContentLoaded', () => {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
  });
  geolocalize().then(center => {
    map.setCenter(center);
  });

  const btnArr = []
  routes.forEach(e => {
    btnArr.push(document.getElementById(e._id));
  })

  const objConfigDR = {map};
  const directionsService = new google.maps.DirectionsService();
  const directionsDisplay = new google.maps.DirectionsRenderer( objConfigDR);

  const calcRoute = route => {
    const start = {lat: route.places[0].location.coordinates[0], lng: route.places[0].location.coordinates[1]};
    const end = {lat: route.places[route.places.length - 1].location.coordinates[0], lng: route.places[route.places.length - 1].location.coordinates[1]};
    const waypoints = calcWaypoints(route);
    const request = {
      origin:start,
      destination:end,
      waypoints,
      travelMode: 'WALKING'
    };
    directionsService.route(request, function(response, status) {
      if (status == 'OK') {
        console.log(response)
        directionsDisplay.setDirections(response);
      }
    });
  }

  const calcWaypoints = route => {
    const waypointsArr = [];
    for(let i = 1; i < route.places.length - 1; i++) {
      waypointsArr.push({
        location: {lat: route.places[i].location.coordinates[0], lng: route.places[i].location.coordinates[1]},
        stopover: true
      });
    };
    return waypointsArr;
  };

  btnArr.forEach(e => {
    e.addEventListener('click', () => {
      calcRoute(routes[0])
    })
  })

}, false);