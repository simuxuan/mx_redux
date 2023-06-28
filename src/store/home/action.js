import { CHANGE_RECOMMENDS,CHNAGE_BANNERS } from "./types"

export const changeRecommendsAction = (data) => ({
    type: CHANGE_RECOMMENDS,
    data
})

export const changeBannersAction = (data) => ({
    type: CHNAGE_BANNERS,
    data
})

