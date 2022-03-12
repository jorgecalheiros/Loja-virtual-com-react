import Api from "./Api";


class ProdutoService {
    async index() {
        try {
            const response = await Api.get("/api/produtos");
            return [response.data, false];
        } catch (error) {
            return [null, error];
        }
    }

    async show(id) {
        try {
            const response = await Api.get(`/api/produtos/${id}`);
            return [response.data, false];
        } catch (error) {
            return [null, error];
        }
    }

    async create(data) {
        try {
            const response = await Api.post("/api/produtos", data);
            return [response.data, false];
        } catch (error) {
            return [null, error];
        }
    }

    async update(id, data) {
        try {
            const response = await Api.put(`api/produtos/${id}`, data);
            return [response.data, false];
        } catch (error) {
            return [null, error];
        }
    }

    async destroy(id) {
        try {
            const response = await Api.delete(`/api/produtos/${id}`);
            return [response.data, false];
        } catch (error) {
            return [null, error];
        }
    }
}

export default new ProdutoService;