import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';


export default function Map({searchResults}) {

    const [selectedLocation, setSelectedLocation] = useState({});
    
    // transform the search results object into the { latitude: 52.516272, longitude: 13.377722 } object
    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }));
    
    //the latitude and longtitude of the center of locations coordinates
    const center = getCenter(coordinates);
    
        const [viewport, setViewport] = useState({
            width: '100%',
            height: '100%',
            latitude: center.latitude,
            longitude: center.longitude,
            zoom: 11
        });

    return (
        <ReactMapGL
            mapStyle='mapbox://styles/diracduran/ckt5sxjog0i9p18nthbwb2aiu'
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker
                        longtitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p onClick={() => setSelectedLocation(result)} aria-label="push-pin" role="img" className="cursor-pointer text-2xl animate-bounce">📍</p>
                    </Marker>

                    {/* the popup that should show if we click on a Marker */}
                    {selectedLocation.long === result.long ? (
                        <Popup closeOnClick={true} onClose={() => setSelectedLocation({})} latitude={result.lat} longitude={result.long}>{result.title}</Popup>
                    ) : (false)}
                </div>
            ))}
        </ReactMapGL>
    )
}
