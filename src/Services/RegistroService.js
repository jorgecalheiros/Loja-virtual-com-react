import Api from "./Api";


class RegistroService {
    async index(params) {
        try {
            const response = await Api.get(`/api/registros?${params}`);
            return [response.data, false];
        } catch (error) {
            return [null, error];
        }
    }

    async produtosMaisVendidos() {
        try {
            const response = await Api.get(`/api/produtosMaisVendidos`);
            return [response.data, false];
        } catch (error) {
            return [null, error];
        }
    }

    async list() {
        try {
            const response = await Api.get(`/api/registros/listAllRegistros/0/`);
            return [response.data, false];
        } catch (error) {
            return [null, error];
        }
    }

    async getTrashed(params) {
        try {
            const response = await Api.get(`/api/registros/onlytrashed/0?${params}`);
            return [response.data, false];
        } catch (error) {
            return [null, error];
        }
    }

    async show(id) {
        try {
            const response = await Api.get(`/api/registros/${id}`);
            return [response.data, false];
        } catch (error) {
            return [null, error];
        }
    }

    async create(data) {
        try {
            const response = await Api.post("/api/registros", data);
            return [response.data, false];
        } catch (error) {
            return [null, error];
        }
    }

    async update(id, data) {
        try {
            const response = await Api.put(`/api/registros/${id}`, data);
            return [response.data, false];
        } catch (error) {
            return [null, error];
        }
    }

    async destroy(id) {
        try {
            const response = await Api.delete(`/api/registros/${id}`);
            return [response.data, false];
        } catch (error) {
            return [null, error];
        }
    }

    async restore(id) {
        try {
            const response = await Api.get(`/api/registros/restore/${id}`);
            return [response.data, false];
        } catch (error) {
            return [null, error];
        }
    }
}

export default new RegistroService;