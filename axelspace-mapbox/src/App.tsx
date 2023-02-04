import { useEffect, useRef, useState } from 'react'
import mapboxgl from "mapbox-gl";

import data from "../src/assets/data/places.json";

import './App.css'
import { Story } from './components/Story';
import { activateTag, getPlaces, getTags, initState, selectPlace, State } from './logic/State';

//specify VITE_MAPBOX_TOKEN in the .env file
const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
mapboxgl.accessToken = mapboxToken;

function App() {
	const mapContainer = useRef(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const [lng, setLng] = useState(39);
	const [lat, setLat] = useState(82);
	const [zoom, setZoom] = useState(9);

	const [state, setState] = useState<State>(initState(data.places));

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
			<div className="map">
				<div>longitude:{lng} latitude:{lat} zoom:{9}</div>
				<div id="map" ref={mapContainer}>
				</div>
			</div>
			<Story
				places={getPlaces(state)}
				tags={getTags(state)}
				onSelectPlace={(id: number) => setState(selectPlace(state, id))}
				activePlaceIndex={state.selectedPlace}
			></Story>
		</div>
	)
}
export default App
