window.onload = function () {
  let latitude = 16.0659;
  let longitude = 120.597;

  // Initialize map
  const map = L.map("map", {
    zoomControl: false,
  }).setView([latitude, longitude], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  // Destination coordinates
  const destination = L.latLng(latitude, longitude);
  const customLocationIcon = L.icon({
    iconUrl: "images/placeholder.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  // Add routing control with placeholder waypoints
  const routeControl = L.Routing.control({
    waypoints: [null, destination], // Placeholder for the user's location
    routeWhileDragging: true,
    lineOptions: {
      styles: [
        {
          color: "#0F7CD7",
          opacity: 0.8,
          weight: 6,
          dashArray: "10, 5",
          lineCap: "butt",
          lineJoin: "bevel",
        },
      ],
    },
    createMarker: function (i, waypoint) {
      return L.marker(waypoint.latLng, { icon: customLocationIcon });
    },
  }).addTo(map);

  // Locate user and update route dynamically
  map.locate({ watch: true, setView: true, maxZoom: 17 });

  map.on("locationfound", function (e) {
    const userLocation = e.latlng;

    // Update routing waypoints dynamically
    routeControl.setWaypoints([userLocation, destination]);

    // Add marker for user's location
    L.marker(userLocation, { icon: customLocationIcon })
      .addTo(map)
      .bindPopup(
        `<span>latitude: <span class="fw-bold">${userLocation.lat}</span><br>longitude: <span class="fw-bold">${userLocation.lng}</span></span>`
      )
      .openPopup();

    // Add circle for accuracy
    /*L.circle(userLocation, {
      radius: e.accuracy / 2,
    }).addTo(map);
   */
  });

  map.on("locationerror", function (error) {
    alert("Location Access Denied");
    console.error(error.message);
  });
};
