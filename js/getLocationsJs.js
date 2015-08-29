function getLocations() {

    var gLatitude = document.getElementById("txtLatitude").value;
    var gLongitude = document.getElementById("txtLongitude").value;
    var maxDistance = document.getElementById("maxDistance").value;
    var maxResults = document.getElementById("maxResults").value;
    var sEndPoint = document.getElementById("endPoint").value; 
    var sUrl = sEndPoint + '/SearchService.svc/GetLocations/' + gLatitude + '/' + gLongitude + '/' + maxDistance + '/' + maxResults;
    console.log(sUrl);

    jQuery.ajax({
        type: 'GET',
        url: sUrl,
        dataType: 'json',
        success: function (data, status, jqXHR) {
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 13,
                center: new google.maps.LatLng(gLatitude, gLongitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var infowindow = new google.maps.InfoWindow();

            var marker, i;

            for (i = 0; i < data["Locations"].length; i++) {

                console.log(data["Locations"][i]);
                var name = data["Locations"][i]["Name"];
                var longitude = data["Locations"][i]["Longitude"];
                var latitude = data["Locations"][i]["Latitude"];

                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(latitude, longitude),
                    map: map
                });

                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent(name);
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }

            
            document.getElementById("fileRecords").value = data["FileRecords"];
            document.getElementById("rDuration").value = data["TotalDuration"];
            document.getElementById("fileDuration").value = data["ReadDataDuration"];            
            document.getElementById("rLatitude").value = data["Latitude"];
            document.getElementById("rLongitude").value = data["Longitude"];
            document.getElementById("rDistance").value = data["Distance"];
            document.getElementById("rMax").value = data["maxResults"];
        },

        error: function (msg, url, line) {
            alert('error trapped in error: function(msg, url, line)');
            alert('msg = ' + msg.status + ', url = ' + url + ', line = ' + line);

        }
    });

}