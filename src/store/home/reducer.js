import { CHANGE_RECOMMENDS, CHNAGE_BANNERS } from "./types";

const initialState = {
    recommends: [],
    banners: []
}

function reducer(preState = initialState, action) {
    switch (action.type) {
        case CHANGE_RECOMMENDS:
            return { ...StaticRange, recommends: action.data }
        case CHNAGE_BANNERS:
            return { ...StaticRange, banners: action.data }
        default:
            return preState
    }
}

export default reducer