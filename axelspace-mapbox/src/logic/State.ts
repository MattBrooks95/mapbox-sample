import { Place, Tag } from "./place"

export class State {
    private origPlaces: Place[] | null = null;
    private availableTags: Tag[] = [];

    public initOrigPlaces(places: Place[]): void {
        if (this.origPlaces !== null) return;
        this.origPlaces = places;
        //get all of the tags from the json data, put them into a set to remove
        //duplicates, and then use the spread operator to turn the set into
        //a normal list, for filtering
        //defaults them to an inactive state
        this.availableTags = [...new Set(places.map(place => place.tags).flat())]
            .map(tagName => {
                return {
                    name: tagName,
                    active: false,
                }
            });
    }

    public getTags(): Tag[] {
        return this.availableTags;
    }

    public getActiveTags(): Tag[] {
        return this.getTags().filter(tag => tag.active);
    }

    public activateTag(tagName: string): void {
        this.availableTags = this.availableTags.map(tag => {
            if (tag.name === tagName) {
                return {
                    name: tagName,
                    active: true
                }
            } else {
                return tag;
            }
        });
    }

    public deactivateTag(tagName: string): void {
        this.availableTags = this.availableTags.map(tag => {
            if (tag.name === tagName) {
                return {
                    name: tagName,
                    active: false
                }
            } else {
                return tag;
            }
        });
    }
}
