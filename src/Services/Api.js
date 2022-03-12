import axios from "axios";

class Api {
    httpClient;

    constructor() {
        this.httpClient = axios.create({
            baseURL: "http://127.0.0.1:8000",
        });
    }

    get(endpoint) {
        return this.httpClient.get(endpoint);
    }

    post(endpoint, data) {
        return this.httpClient.post(endpoint, data);
    }

    put(endpoint, data) {
        return this.httpClient.put(endpoint, data);
    }

    delete(endpoint) {
        return this.httpClient.delete(endpoint);
    }
}

export default new Api;