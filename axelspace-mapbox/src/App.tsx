import { Ref, useEffect, useRef, useState } from 'react'
import mapboxgl from "mapbox-gl";

import data from "../src/assets/data/places.json";

import './App.css'

//specify VITE_MAPBOX_TOKEN in the .env file
const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
mapboxgl.accessToken = mapboxToken;

function App() {
	const [count, setCount] = useState(0)

	const mapContainer = useRef(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const [lng, setLng] = useState(39);
	const [lat, setLat] = useState(82);
	const [zoom, setZoom] = useState(9);

	useEffect(() => {
	}, []);
	useEffect(() => {
		if (map.current !== null) return; // initialize map only once
		if (mapContainer.current !== null) {
			map.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: 'mapbox://styles/mapbox/streets-v12',
				center: [lng, lat],
				zoom: zoom
			});
		}
	}, []);
	return (
		<div className="App">
		{data.places.map((x) => {
			return (<div>{JSON.stringify(x)}</div>);
		})}
		<div>
			<div>longitude:{lng} latitude:{lat} zoom:{9}</div>
			<div id="map" ref={mapContainer}>
			</div>
		</div>
		</div>
	)
}

export default App
