import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Pagination from "react-js-pagination";
import $ from "jquery";

import ProdutoService from "../../Services/ProdutoService";
import AdmLayout from "../../Layouts/AdmLayout";
import CardProdutoAdmin from "../../Components/Admin/CardProduto";
import { NavLink } from "react-router-dom";
import CategoriaService from "../../Services/CategoriaService";
import InputSearch from "../../Components/InputSearch";


function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}
function ProdutosTrashAdmin() {
    const [produtos, setProdutos] = useState([]);
    const [configs, setConfig] = useState({});
    const [pesquisa, setPesquisa] = useState(null);
    const [categoriaInput, setCategoriaValue] = useState(null);
    const [categorias, setCategorias] = useState([]);

    const query = useQuery();
    const categoria = query.get("categoria");
    const pesquisaValue = query.get("pesquisa");

    const builParam = (page = 1) => {
        let param = `page=${page}`;

        if (pesquisa) {
            param += `&s=${pesquisaValue}`;
        }
        if (categoria) {
            param += `&categoria=${categoria}`;
        }
        return param;
    }
    const getProdutosExcluidos = async () => {
        const param = builParam();
        const [data, error] = await ProdutoService.getTrashed(param);

        if (!error) {
            setProdutos(data.list.data);
            setConfig(data.list);
        }
    }
    const getCategorias = async () => {
        const [data, error] = await CategoriaService.getAll();
        if (!error) {
            setCategorias(data.list);
        }
    }
    useEffect(getCategorias, []);
    useEffect(getProdutosExcluidos, [categoria, pesquisaValue]);

    const restoreProduto = async (event) => {
        const id = $(event.target).attr("produto-restore");
        const [data, error] = await ProdutoService.restore(id);
        if (!error) {
            alert("Produto restaurado com sucesso!");
            getProdutosExcluidos();
        }
    }
    const changePage = async (page) => {
        const param = builParam(page);
        const [data, error] = await ProdutoService.getTrashed(param);

        if (!error) {
            setProdutos(data.list.data);
            setConfig(data.list);
        }
    }
    const handleInputCategoria = (event) => {
        const { value } = event.target;
        setCategoriaValue(value);
    }
    const handleInputPesquisa = (event) => {
        const { value } = event.target;
        setPesquisa(value);
    }
    const { current_page, per_page, total } = configs;
    const infoObj = {
        funcaoRestauraProduto: restoreProduto
    }
    return (
        <AdmLayout>
            <div className="container my-2 px-1">
                <InputSearch placeholder={"Pesquise..."} button={"Buscar"} url={`/admin/lixeira?pesquisa=${pesquisa ? pesquisa : ""}`} onChange={handleInputPesquisa} />
                <div className="input-group mb-3 my-2 w-25">
                    <select className="form-control" onChange={handleInputCategoria}>
                        <option selected hidden value={""}>
                            Escolha uma categoria
                        </option>
                        <option value={""} >
                            Todas as categorias
                        </option>
                        {
                            categorias.map((categoria, index) => {
                                return (
                                    <option value={categoria.slug} key={index}>
                                        {categoria.nome}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <NavLink to={`?categoria=${categoriaInput ? categoriaInput : ""}`} className={"btn btn-primary"}>
                        Buscar
                    </NavLink>
                </div>
            </div >
            <hr />
            <table className="table container">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Criado</th>
                        <th scope="col">Alterado</th>
                        <th scope="col">Deletado</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        produtos.map((produto, index) => <CardProdutoAdmin produto={produto} infoObj={infoObj} key={index} />)
                    }
                </tbody>
            </table>
            <div className="container px-1">
                <Pagination
                    activePage={current_page}
                    itemsCountPerPage={per_page}
                    totalItemsCount={!total ? 1 : total}
                    onChange={(pageNumber) => changePage(pageNumber)}
                    prevPageText={"Voltar"}
                    nextPageText={"Proximo"}
                    itemClass={"page-item"}
                    linkClass={"page-link"}
                />
            </div>
        </AdmLayout >
    )
}

export default ProdutosTrashAdmin;