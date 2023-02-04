import { Ref, useEffect, useRef, useState } from 'react'
import mapboxgl from "mapbox-gl";

import reactLogo from './assets/react.svg'
import './App.css'

mapboxgl.accessToken = import.meta.env.MAPBOX_TOKEN;

function App() {
	const [count, setCount] = useState(0)

	const mapContainer = useRef(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const [lng, setLng] = useState(-70.9);
	const [lat, setLat] = useState(42.35);
	const [zoom, setZoom] = useState(9);

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
		<div>
			<div ref={mapContainer}>
			</div>
		</div>
		</div>
	)
}

export default App
