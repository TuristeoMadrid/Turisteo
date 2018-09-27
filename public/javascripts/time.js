document.addEventListener("DOMContentLoaded", () => {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
  });
  geolocalize().then(center => {
    map.setCenter(center);
  });
  const post = places => axios.post("/visit/estimate", { places }, {});
  const timeSpan = document.getElementById('estimated');

  const calcRoute = (strt, nd, waypnts) => {
    const objConfigDR = { map };
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer(objConfigDR); 
    const start = { lat: strt.coordinates[0], lng: strt.coordinates[1] };
    const end = { lat: nd.coordinates[0], lng: nd.coordinates[1 ] };
    const request = {
      origin: start,
      destination: end,
      waypoints: waypnts,
      travelMode: 'WALKING'
    };
    let pr = new Promise((resolve, reject) => {
      directionsService.route(request, function (response, status) {
        directionsDisplay.setDirections(response);
        resolve(response)
      });
    })
    return pr;
  };

  const createStart = arr => arr[0];
  const createEnd = arr => arr[arr.length - 1];
  const createWaypoints = arr => {
    let newArr = arr.filter((e,i,a) => i > 0 && i < a.length - 1 ? e : 0);
    newArr.forEach(e => {
      e.stopover = true;
      e.location = {lat: e.coordinates[0], lng: e.coordinates[1]};
      delete e.coordinates;
      delete e.type;
    });
    return newArr;
  };

  const timeConverter = time => {
    if(time < 60) return time+' mins'
    return Math.floor(time / 60) + ' hours ' + Math.round(time / 60 % 1 * 60) + ' mins';
  }

  document.getElementById("time").onclick = () => {
    let places = document.getElementsByTagName("select");
    let idArr = [];
    for (let i = 0; i < places.length - 1; i++) idArr.push(places[i].value);
    event.preventDefault();
    post(idArr)
    .then(e => {
      calcRoute(createStart(e.data.locations),createEnd(e.data.locations),createWaypoints(e.data.locations))
      .then((response) => {
        let routeTime =  [];
        response.routes[0].legs.forEach(e => routeTime.push(parseInt(e.duration.text.split(' ')[0])))
        routeTime = routeTime.reduce((a,b)=>a+b);
        let poiTime = e.data.time;
        return routeTime + poiTime;
      })
      .then(time => {
        timeSpan.innerHTML = 'Estimated route time: ' + timeConverter(time);
      })
      .then(() => document.getElementById('create').removeAttribute('hidden'))
    })
  };
});
