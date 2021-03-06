import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'https://condapi.coode.com.br/public/api';
//const baseUrl = 'http://127.0.0.1:8000/api';
//adb reverse tcp:8000 tcp:8000 '';https://api.b7web.com.br/devcond/api

const request = async (method, endpoint, params, token = null) => {
    method = method.toLowerCase();
    let fullUrl = `${baseUrl}${endpoint}`;
    let body = null;

    switch(method) {
        case 'get':
            let queryString = new URLSearchParams(params).toString();
            fullUrl += `?${queryString}`;
        break;
        case 'post':
        case 'put':
        case 'delete':
            body = JSON.stringify(params);
        break;
    }

    let headers = {'Content-Type': 'application/json'};
    if(token) {
        headers.Authorization = `Bearer ${token}`;
    }

    let req = await fetch(fullUrl, { method, headers, body });
    let json = await req.json();
    return json;
}

export default  () => {
   return {
        getToken: async () => {
            return await localStorage.getItem('token');
        },
        validateToken: async () => {
            let token = await localStorage.getItem('token');
            let json = await request('post', '/auth/validate', {}, token);
            return json;
        },
        login: async (cpf, password) => {
            let json = await request('post', '/auth/login', {cpf, password});
            return json;
        },
        logout: async () => {
            let token = await localStorage.getItem('token');
            let json = await request('post', '/auth/logout', {}, token);
            await localStorage.removeItem('token');
            // await AsyncStorage.removeItem('property');
            return json;
        },
        getWall: async () => {
            let token = await localStorage.getItem('token');
            let json = await request('get', '/walls', {}, token);
            return json;
        },
        updateWall: async (id, data) => {
            let token = await localStorage.getItem('token');
            let json = await request('put', `/wall/${id}`, data, token);
            return json;
        },
        addWall: async (data) => {
            let token = await localStorage.getItem('token');
            let json = await request('post', '/walls', data, token);
            return json;
        },
        removeWall: async (id) => {
            let token = await localStorage.getItem('token');
            let json = await request('delete', `/walls/${id}`, {}, token);
            return json;
        }

   }
};