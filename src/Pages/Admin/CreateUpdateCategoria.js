import { useEffect, useState } from "react";
import { useParams } from "react-router";

import AdmLayout from "../../Layouts/AdmLayout";
import CategoriaService from "../../Services/CategoriaService";

function CreateUpdateCategoria({ title, button }) {
    const [inputValues, setInputValues] = useState({
        nome: "",
        slug: ""
    });
    const { idCategoria } = useParams();
    const getCategoria = async () => {
        if (idCategoria) {
            const [data, error] = await CategoriaService.show(idCategoria);

            if (!error) {
                const categoria = data.categoria;
                setInputValues((prev) => ({
                    ...prev,
                    ["nome"]: categoria.nome,
                    ["slug"]: categoria.slug
                }))
            }
        }
    }
    useEffect(getCategoria, []);
    function handleInputValue(event) {
        const { name, value } = event.target;
        setInputValues((prev) => ({
            ...prev,
            [name]: value
        }));
    }
    const fetchCreate = async (dataForm) => {
        const [data, error] = await CategoriaService.create(dataForm);
        if (!error) {
            alert("Categoria criada com sucesso!");
            window.location.href = "/admin/categorias";
        }
    }
    const fetchUpdate = async (dataForm) => {
        const [data, error] = await CategoriaService.update(idCategoria, dataForm);
        if (!error) {
            alert("Categoria alterada com sucesso!");
            window.location.href = "/admin/categorias/";
        }
    }
    const validar = () => {
        const campos = [
            inputValues.nome,
            inputValues.slug
        ];

        const vazios = campos.filter(a => a == "");
        if (vazios.length > 0) {
            alert("Ainda há campos que não estão preenchidos");
            return false;
        }
        return inputValues;
    }
    const submitForm = () => {
        const data = validar();
        if (data) {
            const dataForm = new FormData();
            for (const key in data) {
                const value = data[key];
                dataForm.append(key, value);
            }
            if (idCategoria) {
                fetchUpdate(data);
            } else {
                fetchCreate(dataForm);
            }
        }
    }
    return (
        <AdmLayout>
            <div className="container">
                <form>
                    <header>
                        <h2>
                            {title}
                        </h2>
                    </header>
                    <div className="mb-3">
                        <label className="form-label">Nome</label>
                        <input className="form-control" type={"text"} name={"nome"} onChange={handleInputValue} value={inputValues.nome} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Slug</label>
                        <input className="form-control" type={"text"} name={"slug"} placeholder={"exemplo-de-exemplo"} onChange={handleInputValue} value={inputValues.slug} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={submitForm}>{button}</button>
                </form>
            </div>
        </AdmLayout>
    )
}

export default CreateUpdateCategoria;