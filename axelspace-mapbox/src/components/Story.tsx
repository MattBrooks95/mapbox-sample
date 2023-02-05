import { Place, Tag } from "../logic/place";
import { PlaceLabel } from "./PlaceLabel";

import "./Story.css"
import "../shared.css"
import { Button } from "@mui/material";
import { ReactChild, ReactComponentElement, ReactElement } from "react";

export {
    Story
}

type StoryProps = {
    places: Place[];
    tags: Tag[];
    activePlaceIndex?: number;
    onSelectPlace: (id: number) => void;
    onSelectTag: (name: string) => void;
	sortingButtons: ReactElement[];
};

function Story(props: StoryProps) {
    const activePlace = props.activePlaceIndex !== undefined
        ? props.places[props.activePlaceIndex]
        : undefined;
    return (<div className="story-layout">
        <div className="story-right-tray thin-gray-background">
			<div className="story-sort-buttons">
				{props.sortingButtons}
			</div>
            <div className="places-container">
                {props.places.map((place) => {
                    return (<PlaceLabel
                        key={place.id}
                        years={place.years}
                        name={place.name}
                        onClick={(id) => props.onSelectPlace(id)}
                        placeId={place.id}
                        isSelected={props.activePlaceIndex !== undefined && props.places[props.activePlaceIndex].name === place.name}
                    ></PlaceLabel>);
                })}
            </div>
            <div className="tags-container">
            {props.tags.map(t => <button className={t.active ? "" : "disabled-tag"} key={t.name} onClick={() => props.onSelectTag(t.name)}>{t.name}</button>)}
            </div>
            {<textarea className="description-box"
                value={activePlace !== undefined ? activePlace.description : ""}
                >
            </textarea>}
        </div>
    </div>)
}
