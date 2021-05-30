var apigateway =
  "https://htulmx2g97.execute-api.eu-central-1.amazonaws.com/final_prod";


//get current location
  /**
       * Define a namespace for the application.
       */
      window.app = {};
      var app = window.app;


      //
      // Define rotate to north control.
      //


      /**
       * @constructor
       * @extends {ol.control.Control}
       * @param {Object=} opt_options Control options.
       */
      app.RotateNorthControl = function(opt_options) {

        var options = opt_options || {};

        var button = document.createElement('button');
        button.innerHTML = '<i class="fa fa-location-arrow" aria-hidden="true"></i>';

        var this_ = this;
     

        button.addEventListener('click', trackLocation, false);
        button.addEventListener('touchstart', trackLocation, false);

        var element = document.createElement('div');
        element.className = 'rotate-north ol-unselectable ol-control';
        element.appendChild(button);

        ol.control.Control.call(this, {
          element: element,
          target: options.target
        });

      };
      ol.inherits(app.RotateNorthControl, ol.control.Control);

//get current location
  /**
       * Define a namespace for the application.
       */
    //   window.app = {};
    //   var app2 = window.app;


      //
      // Define rotate to north control.
      //


      /**
       * @constructor
       * @extends {ol.control.Control}
       * @param {Object=} opt_options Control options.
       */
      app.addNewData = function(opt_options) {

        var options = opt_options || {};

        var button = document.createElement('button');
        button.innerHTML = '<i class="fa fa-plus-circle" aria-hidden="true"></i>';

        var this_ = this;
     

        button.addEventListener('click', showForm, false);
        button.addEventListener('touchstart', showForm, false);

        var element = document.createElement('div');
        element.className = 'add-data ol-unselectable ol-control';
        element.appendChild(button);

        ol.control.Control.call(this, {
          element: element,
          target: options.target
        });

      };
      ol.inherits(app.addNewData, ol.control.Control);




var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  target: "map",
  controls: ol.control
    .defaults()
    .extend([new app.RotateNorthControl(), new app.addNewData()]),
  view: new ol.View({
    //   projection:'EPSG:4326',
    center: [1496998.8366835883, 6892205.835048231],
    zoom: 11,
  }),
});


//add geolocation
var geolocation = new ol.Geolocation({
  projection: map.getView().getProjection(),
});


geolocation.on("change:position", function () {
    changeCursor('progress')
  var coordinates = geolocation.getPosition();
    map.getView().setCenter(coordinates)
    map.getView().setZoom(14)
    geolocation.setTracking(false);
     changeCursor("default");
});
 
function trackLocation() {
    geolocation.setTracking(true);
}

trackLocation()


function changeCursor(type) {
    document.body.style.cursor = type;

}

 // Instantiate with some options and add the Control
  const geocoder = new Geocoder('nominatim', {
    provider: 'osm',
    targetType: 'text-input',
    lang: 'en',
    placeholder: 'Search for ...',
      limit: 5,
      countrycodes: 'DE',
      preventDefault: true,
    autoComplete:true,
    keepOpen: false,
  });

map.addControl(geocoder);
var selected_address
  geocoder.on('addresschosen', (evt) => {
    console.log(evt)

      map.getView().setCenter(evt.coordinate);
      map.getView().setZoom(14);
      
  });

function showForm() {
    $("#newEntry").modal("show");
    setTimeout(function () {      
      map1.updateSize();   
    },500)
   
}


 
  
  /**
 * Define a namespace for the application.
 */
var app = {};

/**
 * @constructor
 * @extends {ol.interaction.Pointer}
 */
app.Drag = function () {
  ol.interaction.Pointer.call(this, {
    handleDownEvent: app.Drag.prototype.handleDownEvent,
    handleDragEvent: app.Drag.prototype.handleDragEvent,
    handleMoveEvent: app.Drag.prototype.handleMoveEvent,
    handleUpEvent: app.Drag.prototype.handleUpEvent,
  });

  /**
   * @type {ol.Pixel}
   * @private
   */
  this.coordinate_ = null;

  /**
   * @type {string|undefined}
   * @private
   */
  this.cursor_ = "pointer";

  /**
   * @type {ol.Feature}
   * @private
   */
  this.feature_ = null;

  /**
   * @type {string|undefined}
   * @private
   */
  this.previousCursor_ = undefined;
};
ol.inherits(app.Drag, ol.interaction.Pointer);

/**
 * @param {ol.MapBrowserEvent} evt Map browser event.
 * @return {boolean} `true` to start the drag sequence.
 */
app.Drag.prototype.handleDownEvent = function (evt) {
  var map = evt.map;

  var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
    return feature;
  });

  if (feature) {
      this.coordinate_ = evt.coordinate;
    this.feature_ = feature;
  }

  return !!feature;
};

/**
 * @param {ol.MapBrowserEvent} evt Map browser event.
 */
app.Drag.prototype.handleDragEvent = function (evt) {
  var deltaX = evt.coordinate[0] - this.coordinate_[0];
  var deltaY = evt.coordinate[1] - this.coordinate_[1];

  var geometry = this.feature_.getGeometry();
  geometry.translate(deltaX, deltaY);

  this.coordinate_[0] = evt.coordinate[0];
  this.coordinate_[1] = evt.coordinate[1];
};

/**
 * @param {ol.MapBrowserEvent} evt Event.
 */
app.Drag.prototype.handleMoveEvent = function (evt) {
  if (this.cursor_) {
    var map = evt.map;
    var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      return feature;
    });
    var element = evt.map.getTargetElement();
    if (feature) {
      if (element.style.cursor != this.cursor_) {
        this.previousCursor_ = element.style.cursor;
        element.style.cursor = this.cursor_;
      }
    } else if (this.previousCursor_ !== undefined) {
      element.style.cursor = this.previousCursor_;
      this.previousCursor_ = undefined;
    }
  }
};

/**
 * @return {boolean} `false` to stop the drag sequence.
 */
app.Drag.prototype.handleUpEvent = function () {

//   console.log(vectorSource.getFeatures()[0].getGeometry().getCoordinates());
  this.coordinate_ = null;
  this.feature_ = null;
  return false;
};


  var map1 = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
      ],
      
    controls: [] ,
    target: "map1",
    interactions: ol.interaction.defaults().extend([new app.Drag()]),

    view: new ol.View({
      projection: "EPSG:4326",
      center: [9.999833274997995, 50.64993868042329],
      zoom: 6,
    }),
  });

 var geocoder1 = new Geocoder("nominatim", {
   provider: "osm",
   lang: "en",
   placeholder: "Search for ...",
   limit: 5,
   countrycodes: "DE",
//    debug: false,
   autoComplete: true,
//    keepOpen: true,
 });
 geocoder1.on("addresschosen", function (evt) {
   console.info(evt);
      selected_address = evt.address.original.formatted;

     if (map1.getLayers().a[1].getSource().getFeatures().length > 1) {
         map1.getLayers().a[1].getSource().getFeatures().shift();
     }
 });
map1.addControl(geocoder1);
 

var img = "";
function readFile() {
  if (this.files && this.files[0]) {
    var FR = new FileReader();

    FR.addEventListener("load", function (e) {
      img = e.target.result.replace("data:", "").replace(/^.+,/, "");
    });

    FR.readAsDataURL(this.files[0]);
  }
}

// document
//   .getElementById("inputGroupFile01")
//   .addEventListener("change", readFile);

function submitform() {
    document.getElementById("update_sent").innerHTML = ''
    //check all inputs
    if (
        map1.getLayers().a.length > 1 && map1.getLayers().a[1].getSource().getFeatures().length >
        0
    ) {
        var place_name = document.getElementById("place_name").value;
        var geom = {
            lng: map1
                .getLayers()
                .a[1].getSource()
                .getFeatures()[0]
                .getGeometry()
                .getCoordinates()[0],
            lat: map1
                .getLayers()
                .a[1].getSource()
                .getFeatures()[0]
                .getGeometry()
                .getCoordinates()[1],
        };
        var place_time = document.getElementById("place_time").value || "always";
        var telehpone = "+" + 
          document.getElementById("country_code").value +
          "-" +
          document.getElementById("telehpone").value; ;
        var email = document.getElementById("email").value;
        var website = document.getElementById("website").value;
        var pay_attention = document.getElementById("pay_attention").value;
      var do_with_donation = document.getElementById("do_with_donation").value;
      var place_address = selected_address;
      ;
        var availablecategory = document.getElementsByClassName("category");
        var checkedCat = [];
        for (i = 0; i < availablecategory.length; i++){
            var cat = availablecategory[i]; 
            if (cat.checked) {
              checkedCat.push(cat.value);
            }
        }
     
      if (place_name && telehpone && email.includes("@") && website.includes('.')) {
        //check if img is added
        bodyParam = {
          name: place_name,
          time: place_time,
          telehpone: telehpone,
          email: email,
          website: website,
          pay_attention: pay_attention,
          do_with_donation: do_with_donation,
          type: JSON.stringify(checkedCat),
          place_address: place_address,
        };
        if (img) {
          bodyParam["image"] = img;
        }

        //add new entry
        fetch(apigateway, {
          method: "POST",

          body: JSON.stringify({
            data: bodyParam,
            geometry: geom,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            $("#newEntry").modal("hide");
            img = "";
fetchdata();
            // fetchdata();
            clearform();
          });
      } else {
        addAlert("Please Fill Form Completely");
      }
    } else {
      addAlert("Please select Location");
    }
}


document.getElementsByClassName("gcd-gl-control")[0].className =
    "gcd-gl-control ol-control gcd-gl-expanded";
  
function addAlert(text) {
    document.getElementById("update_sent").innerHTML = '<div class="alert alert-danger" role="alert">'+text+'</div>';
}

var allFetchedFeatures;
function fetchdata() {
  fetch(
    apigateway 
  )
    .then((res) => res.json())
      .then((data) => {
         
      //add all points to map
        var allPoints = dynamoDBtoGeojson(data);
         console.log(allPoints);
      master_points_source.clear();
      master_points_source.addFeatures(
        new ol.format.GeoJSON().readFeatures(allPoints)
      );
      allFetchedFeatures = master_points_source.getFeatures();
    });
}

fetchdata()

function showData() {
    var allcat = document.getElementsByClassName("categoryShow");
    var selectedCat = []
    for (i = 0; i < allcat.length; i++){
        if (allcat[i].checked) selectedCat.push(allcat[i].value)
    }
    master_points_source.clear();
    for (i = 0; i < allFetchedFeatures.length; i++){
        var available = false
        selectedCat.forEach(cat => {
            if (allFetchedFeatures[i].getProperties()['type'].includes(cat)) {
               available = true 
            }
        })
        if (available) {
            master_points_source.addFeature(allFetchedFeatures[i]);
        }
    }

}

function dynamoDBtoGeojson(dynamodata) {
  var geoJSON = {
    type: "FeatureCollection",
    features: [],
  };

  dynamodata.forEach((feature) => {
    if (feature.geoJson) {
        let geojson_feat = { type: "Feature" };
        var new_ccord = ol.proj.transform(JSON.parse(feature.geoJson).coordinates, 'EPSG:4326', 'EPSG:3857')
      geojson_feat["geometry"] = {
        type: camelize(JSON.parse(feature.geoJson).type),
        coordinates: new_ccord,
      };
        geojson_feat["properties"] = feature;
       geojson_feat["properties"]['type']=   JSON.parse(feature.type);

      delete geojson_feat.properties.geoJson;
      delete geojson_feat.properties.geohash;
      delete geojson_feat.properties.hashKey;
      geoJSON.features.push(geojson_feat);
    }
  });

  return geoJSON;
}
function camelize(str) {
  return str[0].toUpperCase() + str.substring(1).toLowerCase();
}

var master_points_source = new ol.source.Vector();
var master_points = new ol.layer.Vector({
    source: master_points_source,
  style: 
    new ol.style.Style({
        image: new ol.style.Icon(
          /** @type {olx.style.IconOptions} */ ({
            scale: 0.2,
            src: "./assets/custom/images/marker.svg",
          })
        ),
      })
    
  
});
map.addLayer(master_points);


map.on("click", function (evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
   return feature;
  });

  if (feature) {
      console.log(feature);
      
 $("#popupModal").modal('show');

     
    // document.getElementById("popup").style.display = "block";
    // document.getElementById("popup-img").src = feature.getProperties().photoURL;
    // document.getElementById("popup-type").innerHTML =
      var available_type = feature.getProperties().type;
      document.getElementById("available_type").innerHTML = '';
      available_type.forEach(type => {
 document.getElementById("available_type").innerHTML +=
   '<button type="button" class="btn btn-outline-success" disabled>' + type + "</button>";
      })
    document.getElementById("feature_name").innerHTML =
        feature.getProperties().name;
         document.getElementById("feature_time").innerHTML =
             feature.getProperties().time;
         document.getElementById("feature_telehpone").innerHTML =
           feature.getProperties().telehpone;
    document.getElementById("feature_address").innerHTML =
      feature.getProperties().place_address;
         document.getElementById("feature_email").innerHTML =
             feature.getProperties().email;
         document.getElementById("feature_website").innerHTML =
             feature.getProperties().website;
         document.getElementById("feature_pay_attention").innerHTML =
             feature.getProperties().pay_attention;
         document.getElementById("feature_do_with_donation").innerHTML =
             feature.getProperties().do_with_donation;
         
    //   
    // document.getElementById("popup-time").innerHTML =
    //   feature.getProperties().time;
    // document.getElementById("popup-functional").innerHTML =
    //   feature.getProperties().functional;
  } else {
    // document.getElementById("popup").style.display = "none";
  }
});

function clicked() {
  console.log('done')
}
document.getElementsByClassName("gcd-road").onclick = clicked;

function clearform() {
  document.getElementById("place_name").value = "";
  document.getElementById("telehpone").value = "";
           document.getElementById("email").value = "";
place_address =''
  document.getElementById("website").value = "";
           document.getElementById("place_time").innerHTML = "";

         document.getElementById("pay_attention").innerHTML = "";
         document.getElementById("do_with_donation").innerHTML = "";

}