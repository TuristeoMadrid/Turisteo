document.addEventListener('DOMContentLoaded', () => {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
  });
  geolocalize().then(center => {
    map.setCenter(center);
  });
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
}, false);
let map;
