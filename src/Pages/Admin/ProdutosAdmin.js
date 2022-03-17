import React, { useEffect, useState } from "react"
import { useLocation } from "react-router"
import Pagination from "react-js-pagination";

import ProdutoService from "../../Services/ProdutoService";
import AdmLayout from "../../Layouts/AdmLayout";
import CardProdutoAdmin from "../../Components/Admin/CardProduto";
import { NavLink } from "react-router-dom";
import InputSearch from "../../Components/InputSearch";


function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}
function ProdutosAdmin() {
    const [produtos, setProdutos] = useState([]);
    const [configs, setConfig] = useState({});
    const [pesquisa, setPesquisa] = useState(null);

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
    const getByCategoria = async () => {
        const param = builParam();
        const [data, error] = await ProdutoService.index(param);

        if (!error) {
            setProdutos(data.list.data);
            setConfig(data.list);
        }
    }
    useEffect(getByCategoria, [categoria, pesquisaValue]);
    const changePage = async (page) => {
        const param = builParam(page);
        const [data, error] = await ProdutoService.index(param);

        if (!error) {
            setProdutos(data.list.data);
            setConfig(data.list);
        }
    }
    const handleInputPesquisa = (event) => {
        const { value } = event.target;
        setPesquisa(value);
    }
    const { current_page, per_page, total } = configs;
    return (
        <AdmLayout>
            <div className="container my-2 px-1">
                <NavLink to={"/admin/create/produto"} className={"btn btn-primary"}>
                    Cadastrar produto
                </NavLink>
                <InputSearch placeholder={"Pesquise..."} button={"Buscar"} url={`/admin/produtos?pesquisa=${pesquisa ? pesquisa : ""}`} onChange={handleInputPesquisa} />
            </div >
            <hr />
            <table className="table container">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        produtos.map((produto, index) => <CardProdutoAdmin produto={produto} key={index} />)
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

export default ProdutosAdmin;