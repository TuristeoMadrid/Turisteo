document.addEventListener('DOMContentLoaded', () => {
  const directionsService = new google.maps.DirectionsService();

  axios.post()

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

  document.getElementById('time').onclick = () => {
    event.preventDefault();
    const points = document.getElementsByTagName('select');
    const waypoints = calcWaypoints(points);
  }

});