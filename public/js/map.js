mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: listing.geometry.coordinates,
  zoom: 9
});

const popup = new mapboxgl.Popup({ offset: 25 })
  .setHTML(`<h2>${listing.title}</h2><p>exact location will be provided after booking</p>`);

new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates)
  .setPopup(popup)
  .addTo(map);