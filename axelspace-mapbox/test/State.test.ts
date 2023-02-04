import { describe, test, expect } from "vitest";

import data from "../src/assets/data/places.json";

import { activateTag, deactivateTag, getActiveTags, initState, State } from "../src/logic/State";

function getState(): State {
    return initState(data.places);
}

describe("State", () => {
    test("initialize tag list", () => {
        const state = getState();
        expect(state.tags.map(x => x.name)).toEqual([
            "childhood",
            "education",
            "career",
            "adult"
        ]);
    });

    test("set a tag to be active", () => {
        const state = getState();
        expect(getActiveTags(state)).toEqual([]);

        const stateChildhood = activateTag(state, "childhood");
        expect(getActiveTags(stateChildhood).map(t => t.name)).toEqual(["childhood"]);
        const stateCareer = activateTag(stateChildhood,"career");
        expect(getActiveTags(stateCareer).map(t => t.name)).toEqual(["childhood", "career"]);
    });

    test("set a tag to be inactive", () => {
        const state = getState();
        const testTag = "childhood";
        const withActiveTag = activateTag(state, testTag);
        expect(getActiveTags(withActiveTag).map(t => t.name)).toEqual([testTag]);
        const noActiveTags = deactivateTag(withActiveTag, testTag);
        expect(getActiveTags(noActiveTags).map(t => t.name)).toEqual([]);
    });
});
