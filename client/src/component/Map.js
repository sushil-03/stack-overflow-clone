import React, { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
// import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
import MapboxWorker from "mapbox-gl/dist/mapbox-gl-csp-worker";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";

const Map = () => {
    const [latitude, setLang] = useState("");
    const [longitude, setLong] = useState("");
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLang(position.coords.latitude);
            setLong(position.coords.longitude);
        });
        if (mapboxgl) {
            mapboxgl.accessToken =
                "pk.eyJ1Ijoic3VzaGlsZSIsImEiOiJja3IyYjh2NW0waW1yMm5yeDEwamtveG52In0.CtiyE_hQWk3oCQdvhx46dw";

            // mapboxgl.workerClass = MapboxWorker;

            const map = new mapboxgl.Map({
                container: "map",
                style: "mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph",
                center: [78.032188, 30.316496],
                zoom: 4,
                attributionControl: false,
            });

            map.scrollZoom.enable();
            const nav = new mapboxgl.NavigationControl();
            map.addControl(nav);

            new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

            map.addControl(new mapboxgl.AttributionControl(), "bottom-left");
        }
    }, [latitude, longitude]);
    return <div id="map" className="flex-1"></div>;
};

export default Map;
