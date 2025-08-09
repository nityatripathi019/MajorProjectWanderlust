

// console.log(mapToken);
mapboxgl.accessToken = mapToken;
// const coords = [74.1240, 15.2993];
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: coordinates,//[long.lattitude]
  zoom: 9,
});

console.log(coordinates);
const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25, className: "booking-popup" })
    .setHTML(`<h4>${listingTitle}</h4><p>Exact location provided after booking </p>`))
  .addTo(map);