import { describe, test, expect } from "vitest";

import data from "../src/assets/data/places.json";

import { getActiveTags, initState, State, toggleTag } from "../src/logic/State";

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

        const stateChildhood = toggleTag(state, "childhood");
        expect(getActiveTags(stateChildhood).map(t => t.name)).toEqual(["childhood"]);
        const stateCareer = toggleTag(stateChildhood,"career");
        expect(getActiveTags(stateCareer).map(t => t.name)).toEqual(["childhood", "career"]);
    });

    test("set a tag to be inactive", () => {
        const state = getState();
        const testTag = "childhood";
        const withActiveTag = toggleTag(state, testTag);
        expect(getActiveTags(withActiveTag).map(t => t.name)).toEqual([testTag]);
        const noActiveTags = toggleTag(withActiveTag, testTag);
        expect(getActiveTags(noActiveTags).map(t => t.name)).toEqual([]);
    });
});
