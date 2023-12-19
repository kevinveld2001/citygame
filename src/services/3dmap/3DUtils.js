import * as THREE from 'threebox-plugin/src/three';     // threebox = three.js + GLTFLoader + more (for mapbox)
import { Threebox } from 'threebox-plugin';
import mapboxgl from 'mapbox-gl';

/* TODO:
 * - On current page: init Mapbox Map object
 * - On current page: init Threebox object tied to the map (never global / on window)
 * - On current page: if any relevant 3D models, spawn them on a dedicated layer (technically each new model could be on a new layer)
 * - On current page: --||-- tooltips
 * - On leave page: dispose of Threebox (allegedly handles all necessary underlying disposes)
 */



/**
 * Initializes a new instance of a Mapbox Map.
 * 
 * @param options REQUIRED: ```container``` with the HTML element that will hold this map. For all options, see: https://docs.mapbox.com/mapbox-gl-js/api/map/
 */
export function initMapboxMap(options) {
    return new mapboxgl.Map(options);
}

// @param map Mapbox map to initialize Threebox on.
/**
 * Initializes a new live (updating) Threebox instance linked to the Mapbox 'map' (WebGL context is obtained automatically from it).
 * 
 * @param mapLayerId Unique ID string for the newly created map layer.
 * @param options (optional) Threebox instance options. ```!! WARNING: IF YOU USE THIS, YOU MUST SPECIFY '{ preserveDrawingBuffer: false }'!!``` See: https://github.com/jscastro76/threebox/blob/master/docs/Threebox.md#threebox-instance
 * 
 * @returns The initialized Threebox instance. Use this for all subsequent operations on the same map/page.
 */
export function initThreeboxOnMap(mapLayerId, map, options) {
    const finalOptions = options === undefined ? { preserveDrawingBuffer: false } : options;

    const newTb = new Threebox(map, map.getCanvas().getContext('webgl'), finalOptions);

    map.addLayer({
            id: mapLayerId,
            type: 'custom',
            renderingMode: '3d',
                
            render: function () { newTb.update(); }
        });

    return newTb;
}

/**
 * Adds a Mapbox layer configured to render 3D models. The new layer must be identified by other Mapbox functions via its unique ID.
 * 
 * @param mapboxMap Map to add the layer to.
 * @param layerId Unique ID string for the newly created map layer.
 * 
 */
export function add3DRenderLayer(mapboxMap, layerId) {
    mapboxMap.addLayer({
        id: layerId,
        type: 'custom',
        renderingMode: '3d',
            
        render: function () { window.tb.update(); }
    });
}

/**
 * Adds a Mapbox source of data. This must be added to a layer afterwards to be displayed. Use `````` for that.
 * 
 * @param mapboxMap Map to add the source to.
 * @param sourceId Unique ID string for the source.
 * @param file File path to a ```.geojson``` file in ```/public``` folder. File must be formatted as valid GeoJSON (see ```/public/dataJSON/Example.js```).
 * 
 */
export function addSourceGeoJSON(mapboxMap, sourceId, file) {
    mapboxMap.addSource(sourceId, {
        "type": "geojson",
        "data": file
    });
}

/**
 * Adds a Mapbox layer connected to a previously added source of data (with the same ID used here).
 * This displays the source data features on the map as circles, with the given paint options.
 * 
 * @param mapboxMap Map to add the layer to.
 * @param layerId Unique ID string for the newly created map layer. This MUST match a sourceId from a previously added source.
 * @param paintOptions See properties at https://docs.mapbox.com/style-spec/reference/layers/#circle.
 * 
 */
export function addLayerFeaturePointsAsCircles(mapboxMap, layerId, paintOptions) {
    mapboxMap.addLayer({
        id: layerId,
        type: 'circle',
        source: layerId,
        paint: paintOptions
    });
}

/**
 * Adds a Mapbox layer connected to a previously added source of data (with the same ID used here).
 * This displays the source data on the map as a line route under Mapbox ```symbol``` type, with the given layout options.
 * 
 * @param mapboxMap Map to add the layer to.
 * @param layerId Unique ID string for the newly created map layer. This MUST match a sourceId from a previously added source.
 * @param imageFile File path to an image in ```/public``` folder. The image will be loaded as the repeating symbol on the line route.
 * @param imageId Unique ID string for the image.
 * @param layoutOptions See properties at https://docs.mapbox.com/style-spec/reference/layers/#symbol.
 * 
 */
export function addLayerFeaturePointsAsLineRouteWithImage(mapboxMap, layerId, imageFile, imageId, layoutOptions) { 
    mapboxMap.loadImage(imageFile,
        (error, image) => {
            if (error) throw error;

            mapboxMap.addImage(imageId, image);

            layoutOptions["symbol-placement"] = "line";
            layoutOptions["icon-image"] = ["image", imageId];   // https://docs.mapbox.com/style-spec/reference/expressions/#types-image

            mapboxMap.addLayer({
                id: layerId,
                type: 'symbol',
                source: layerId,
                layout: layoutOptions
            });
        }
);
}

// @param tbox Threebox instance on whose underlying map the object will be loaded.
/**
 * Loads a new GLTF object from ```file``` in scale "meters" on current global Threebox instance AND adds it.
 * IF YOU NEED TO KEEP REFERENCE TO THE OBJECT OR SET UP ITS PROPERTIES, USE ```callback```!
 * 
 * @param file File to load the object from. Use ```/directory/file.extension``` absolute format to load from ```/public```.
 * @param options (optional) Threebox instance setup options. THE REQUIRED OPTIONS ARE ALREADY HARDCODED. See: https://github.com/jscastro76/threebox/blob/master/docs/Threebox.md#loadobj . SET ROTATION AND SCALE DIRECTLY HERE!!  SET COORDINATES IN THE CALLBACK INSTEAD!!
 * @param callback (optional) Function to run when the object has finished loading. Use this to set up properties. The object is already added to Threebox after this, DO NOT add it again.
 *
 */
// @returns The successfully loaded and added object. Use this to set transforms, other options, or event listeners.
export function loadGLTFObject(file, options, callback) {
    options["obj"] = file;   // loads from /public after webpack bundles it
    options["type"] = 'gltf';
    options["units"] = 'meters';

    if (!window.tb) throw new Error("No Threebox global instance found on window! Cannot use Threebox on this page!");
    window.tb.loadObj(options, (obj) => {
        callback(obj);
        window.tb.add(obj);
    });
}