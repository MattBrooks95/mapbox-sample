import { Place, Tag } from "./place"

export type {
    State,
}
export {
    initState,
    getPlaces,
    getTags,
    deactivateTag,
    activateTag,
    selectPlace,
    getActiveTags,
}

type State = {
    origPlaces: Place[];
    tags: Tag[];
    selectedPlace?: number;
}

function initState(places: Partial<Place>[]): State {
    const origPlaces = places.map((place, placeIndex) => {
        return Object.assign({}, place, { idx: placeIndex });
    }) as Place[];

    //get all of the tags from the json data, put them into a set to remove
    //duplicates, and then use the spread operator to turn the set into
    //a normal list, for filtering
    //defaults them to an inactive state
    const tags = [...new Set(places.map(place => place.tags).flat())]
        .map(tagName => {
            return {
                name: tagName,
                active: false,
            }
        }) as Tag[];
    return {
        origPlaces,
        tags,
        selectedPlace: undefined,
    }
}

function getPlaces(state: State): Place[] {
    const activeTags = new Set(getActiveTags(state).map(t => t.name));
    return [...state.origPlaces].filter(place => {
        const placeTags = place.tags;
        return placeTags.filter(placeTag => !activeTags.has(placeTag)).length !== 0;
    });
}

function getTags(state: State): Tag[] {
    return state.tags;
}

function getActiveTags(state: State): Tag[] {
    return getTags(state).filter(tag => tag.active);
}

function activateTag(state: State, tagName: string): State {
    const newTags = state.tags.map(tag => {
        if (tag.name === tagName) {
            return {
                name: tagName,
                active: true
            }
        } else {
            return tag;
        }
    });
    return Object.assign({}, state, { tags: newTags });
}

function deactivateTag(state: State, tagName: string): State {
    const newTags = state.tags.map(tag => {
        if (tag.name === tagName) {
            return {
                name: tagName,
                active: false
            }
        } else {
            return tag;
        }
    });

    return Object.assign({}, state, {tags: newTags});
}

function selectPlace(state: State, placeId: number): State {
    return Object.assign({}, state, {selectedPlaceId: placeId});
}
