import {API_URL} from "../const.js";
import axios from "axios";

export class ApiService {
    #apiUrl = API_URL;

    constructor() {
        this.accessKey = localStorage.getItem("accesskey");
        console.log("this.accessKey: ", this.accessKey);
    }
    async getAccessKey(){
        try {
            if(!this.accessKey){
                const response = await axios.get(`${this.#apiUrl}api/users/accessKey`);
                this.accessKey = response.data.accessKey;
                localStorage.setItem("accessKey", this.accessKey);
            }
        } catch(error){
            console.log("error: ", error);
        }
    }
    async getData(pathname, params = {}){
        if(!this.accessKey){
            await this.accessKey;
        }
        try{
            const response = await axios.get(`${this.#apiUrl}${pathname}`,{
                headers: {
                    Authorization: `Bearer ${this.accessKey}`,
                },
                params,
            })
            return response.data;
        }catch (error){
            if(error.response && error.response.status === 401){
                this.accessKey = null;
                localStorage.removeItem('accessKey');

                return this.getData(pathname, params);
            }else{
                console.log(error);
            }
        }
    }
   async getProducts(page = 1, limit = 12, list, category, q){
        return await this.getData('api/products',{
            page, limit, list, category, q,
        });
   }
}