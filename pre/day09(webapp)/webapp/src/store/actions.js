import {GETSELLER,GETGOODS,GETRATINGS} from "store/mutation_types.js"
import axios from "@/http/http";
const OK = 200;
export default {
    async [GETSELLER]({commit}){
        //发请求获取数据  提交mutation
        const {code,data} = await axios.get("/api/seller")
        if(code === OK)
            commit(GETSELLER,data)
    },
    async [GETGOODS]({commit}){
        //发请求获取数据  提交mutation
        const {code,data} = await axios.get("/api/goods")
        if(code === OK)
            commit(GETGOODS,data)
    },
    async [GETRATINGS]({commit}){
        //发请求获取数据  提交mutation
        const {code,data} = await axios.get("/api/ratings")
        if(code === OK)
            commit(GETRATINGS,data)
    }
}