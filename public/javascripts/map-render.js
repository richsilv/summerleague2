(function () {
  window.$('.map-holder').each(function (ind) {
    var $el = window.$(this)
    var mapName = 'map' + ind.toString()
    var tileLayer = window.L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
    })
    var mapCenter = $el.data('map-center')
    var mapGPX = $el.data('gpx')
    var mapMarkers = $el.data('map-markers')
    $el.append('<div id="' + mapName + '" class="map"></div>')
    var map = window.L.map(mapName, {
      doubleClickZoom: false
    }).setView(mapCenter, 15)
    tileLayer.addTo(map)
    renderRoute('/gpx/' + mapGPX)

    function renderRoute (data) {
      console.log(data)
      new window.L.GPX(data, {
        async: true,
        marker_options: {
          startIconUrl: '/images/start-race.png',
          endIconUrl: '/images/finish-race.png',
          shadowUrl: '/images/pin-shadow.png'
        }
      }).on('loaded', function (e) {
        map.fitBounds(e.target.getBounds())
        mapMarkers && mapMarkers.forEach(function (marker) {
          window.L.marker(marker.LatLng, {
            icon: window.L.icon({
              iconUrl: marker.options.icon,
              iconSize: [32, 37],
              iconAnchor: [16, 37]
            }),
            title: marker.options.title
          }).addTo(map)
        })
      }).addTo(map)
    }
  })
}())
