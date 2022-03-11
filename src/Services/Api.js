import axios from "axios";

class Api {
    httpClient;

    constructor() {
        this.httpClient = axios.create({
            baseURL: "http://localhost",
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