const btnArr = []
routes.forEach(e => {
  btnArr.push(document.getElementById(e._id));
});


btnArr.forEach(e => {
  e.addEventListener('click', () => {
    let routePrint = routes.find(a => {
      return e.id === a._id;
    });
    calcRoute(routePrint);
  });
});


const objConfigDR = { map };
const directionsService = new google.maps.DirectionsService();
const directionsDisplay = new google.maps.DirectionsRenderer(objConfigDR);

const calcRoute = route => {
  console.log(route)
  const start = { lat: route.places[0].location.coordinates[0], lng: route.places[0].location.coordinates[1] };
  const end = { lat: route.places[route.places.length - 1].location.coordinates[0], lng: route.places[route.places.length - 1].location.coordinates[1] };
  const waypoints = calcWaypoints(route);
  console.log(waypoints)
  const request = {
    origin: start,
    destination: end,
    waypoints,
    travelMode: 'WALKING'
  };
  directionsService.route(request, function (response, status) {
    console.log(response)
    if (status == 'OK') {
      directionsDisplay.setDirections(response);
    }
  });
}

const calcWaypoints = route => {
  const waypointsArr = [];
  for (let i = 1; i < route.places.length - 1; i++) {
    waypointsArr.push({
      location: { lat: route.places[i].location.coordinates[0], lng: route.places[i].location.coordinates[1] },
      stopover: true
    });
  };
  return waypointsArr;
};