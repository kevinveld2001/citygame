// This example is provided as a JavaScript (.js) file to be able to use comments.
// In order to turn this into a valid GeoJSON file,
// remove "const object =", remove all comments, and remove all trailing commas after objects or properties.

// See Example.geojson. You can also copy that for new entries to make sure you follow the proper format.

const object = {
    "type": "FeatureCollection",    // FeatureCollection even if you use one feature; you might add more later
    "features": [
        {
            "type": "Feature",      // required; every feature is of type Feature
            "geometry":     // required
            {
                "type": "Point",    // Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon, or GeometryCollection
                "coordinates": [13.6343074, 45.953702]  // Point: 1 coordinate, format [long, lat] (reverse of the usual)
            },
            "properties":   // required for Mapbox features
            {
                // however, specific properties are all optional (not required)
                "title": "Ms. Novak's house",   // Via Caterina Percoto, 1
                "marker-symbol": "monument"
            }
        },

        {
            "type": "Feature",
            "geometry":
            {
                "type": "Point",
                "coordinates": [13.6338457, 45.9553166]
            },
            "properties":
            {
                "title": "Via Caprin bus stop",
                //"marker-symbol": "monument"
            }
        },

        {
            "type": "Feature",
            "geometry":
            {
                "type": "Point",
                "coordinates": [13.6350897, 45.9553188]
            },
            "properties":
            {
                "title": "Caffe Bordo",     // Kolodvorska pot, 8 (near train station)
                //"marker-symbol": "monument"
            }
        },


    ]
}