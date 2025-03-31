import DFRequest from "..";

interface Loginparams {
    username: string;
    password: string;
}
export function userLogin(params: Loginparams){
    return DFRequest.post({
        url: '/login',
        data: params
    })
}