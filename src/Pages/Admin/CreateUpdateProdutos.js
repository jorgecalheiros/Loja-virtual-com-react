import { useEffect, useState } from "react"
import $ from "jquery";
import { useParams } from "react-router";

import ProdutoService from "../../Services/ProdutoService";
import CategoriaService from "../../Services/CategoriaService";
import AdmLayout from "../../Layouts/AdmLayout";


function CreateUpdateProdutos({ title, button }) {
    const [InputValues, setInputValues] = useState({
        nome: "",
        preco: "",
        categoria: "",
        foto: "",
        descricao: "",
        estoque: 1,
    });
    const [categorias, setCategoria] = useState([]);
    const { idProduto } = useParams();

    const getProduto = async () => {
        if (idProduto) {
            const [data, error] = await ProdutoService.show(idProduto);

            if (!error) {
                const produto = data.produto;
                setInputValues((prev) => ({
                    ...prev,
                    ["nome"]: produto.nome,
                    ["preco"]: produto.preco,
                    ["foto"]: produto.foto,
                    ["categoria"]: produto.categoria,
                    ["descricao"]: produto.descricao
                }))
            }
        }
    }
    useEffect(getProduto, []);
    function handleFormValues(event) {
        const { name, value, files } = event.target;
        setInputValues((prev) => ({
            ...prev,
            [name]: value
        }))
        if (files) {
            setInputValues((prev) => ({
                ...prev,
                ["foto"]: files[0]
            }))
        }

    }
    function validar() {
        const campos = [
            InputValues.nome,
            InputValues.categoria,
            InputValues.preco,
        ]
        const vazios = campos.filter(a => a == "");
        if (vazios.length > 0) {
            alert("Ainda há campos não preenchidos");
            return false;
        }
        return InputValues;
    }
    const fetchUpdate = async (dataForm) => {
        const [data, error] = await ProdutoService.update(idProduto, dataForm);

        if (!error) {
            alert("Produto alterado com sucesso!");
            window.location.href = "/admin/produtos";
        }
    }
    const fetchCreate = async (dataForm) => {
        const [data, error] = await ProdutoService.create(dataForm);

        if (!error) {
            alert("Produto criado com sucesso!");
            window.location.href = "/admin/produtos";
        }
    }
    const submitForm = () => {
        const data = validar();
        if (data) {
            const formData = new FormData();
            for (const key in data) {
                const value = data[key];
                formData.append(key, value);
            }
            if (idProduto) {
                fetchUpdate(InputValues);
            } else {
                fetchCreate(formData);
            }
        }
    }
    const getCategoria = async () => {
        const param = `param=1`;
        const [data, error] = await CategoriaService.index(param);

        if (!error) {
            setCategoria(data.list.data);
        }
    }
    useEffect(getCategoria, []);
    $("#fileProduto").change(function () {
        const file = this.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = function () {
            $("#img-preview").attr("src", fileReader.result);
        }
        fileReader.readAsDataURL(file);
    })
    const imgProduto = () => {
        if (idProduto) {
            return `http://localhost:8000/api/produtos/image/${InputValues.foto}`;
        }
        return `../`;
    }
    return (
        <AdmLayout>
            <div className="container">
                <form>
                    <header>
                        <h2>{title}</h2>
                    </header>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Nome do produto</label>
                        <input type="text" className="form-control" onChange={handleFormValues} name="nome" value={InputValues.nome} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Preço</label>
                        <input type="text" className="form-control" onChange={handleFormValues} name={"preco"} placeholder="00.00" maxLength={"5px"} value={InputValues.preco} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Categoria</label>
                        <select className="form-control" onChange={handleFormValues} name={"categoria"} value={InputValues.categoria}>
                            <option selected hidden>
                                Escolha
                            </option>
                            {categorias.map((categoria, index) => {
                                return (
                                    <option value={categoria.id} key={index}>
                                        {categoria.nome}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    {!idProduto &&
                        <div className="mb-3">
                            <label className="form-label">Imagem do produto</label>
                            <input type="file" id="fileProduto" className="form-control" onChange={handleFormValues} name={"foto"} />
                        </div>
                    }
                    <div className="w-25 mb-2">
                        <header>
                            <h6>
                                {!idProduto &&
                                    <div>
                                        Pré-visualização da imagem
                                    </div>
                                }
                                {idProduto &&
                                    <div>
                                        Imagem
                                    </div>
                                }
                            </h6>
                        </header>
                        <img src={imgProduto()} id="img-preview" className="card-img-top" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descrição do produto (opcional)</label>
                        <textarea className="form-control" onChange={handleFormValues} name={"descricao"} value={InputValues.descricao}>

                        </textarea>
                    </div>
                    <div className="mb-3">
                        <label for="estoque" className="form-label">Estoque</label>
                        <input name="estoque" id="estoque" className="form-control" onChange={handleFormValues} value={InputValues.estoque} type={"number"} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={submitForm}>{button}</button>
                </form>
            </div>
        </AdmLayout>
    )
}

export default CreateUpdateProdutos;