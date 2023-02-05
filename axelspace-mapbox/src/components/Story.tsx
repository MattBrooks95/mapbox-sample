import { Place, Tag } from "../logic/place";
import { PlaceLabel } from "./PlaceLabel";

import "./Story.css"
import "../shared.css"

export {
    Story
}

type StoryProps = {
    places: Place[];
    tags: Tag[];
    activePlaceIndex?: number;
    onSelectPlace: (id: number) => void;
};

function Story(props: StoryProps) {
    const activePlace = props.activePlaceIndex !== undefined
        ? props.places[props.activePlaceIndex]
        : undefined;
    return (<div className="story-layout">
        <div className="story-right-tray thin-gray-background">
            <div className="places-container">
                {props.places.map((place) => {
                    return (<PlaceLabel
                        key={place.id}
                        years={place.years}
                        name={place.name}
                        onClick={(id) => props.onSelectPlace(id)}
                        placeId={place.id}
                        isSelected={props.activePlaceIndex === place.id}
                    ></PlaceLabel>);
                })}
            </div>
            <div className="tags-container">
            {props.tags.map(t => <button disabled={t.active} key={t.name}>{t.name}</button>)}
            </div>
            {<textarea className="description-box"
                value={activePlace !== undefined ? activePlace.description : ""}
                >
            </textarea>}
        </div>
    </div>)
}
