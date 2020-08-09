import {GETSELLER,GETGOODS,GETRATINGS} from "store/mutation_types.js"
export default {
    [GETSELLER](state,seller){
        state.seller = seller
    },
    [GETGOODS](state,goods){
        state.goods = goods
    },
    [GETRATINGS](state,ratings){
        state.ratings = ratings
    }
}