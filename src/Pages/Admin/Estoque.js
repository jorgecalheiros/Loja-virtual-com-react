import React, { useEffect, useState } from "react"
import { useLocation } from "react-router"
import Pagination from "react-js-pagination";

import InputSearch from "../../Components/InputSearch";
import CardEstoque from "../../Components/Admin/CardEstoque";
import AdmLayout from "../../Layouts/AdmLayout"
import ProdutoService from "../../Services/ProdutoService"


function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Estoque() {
    const [produtos, setProdutos] = useState([]);
    const [configs, setConfig] = useState({});
    const [pesquisa, setPesquisa] = useState(null);
    const query = useQuery();
    const pesquisaValue = query.get("pesquisa");

    const builParam = (page = 1) => {
        let param = `page=${page}`;

        if (pesquisa) {
            param += `&s=${pesquisaValue}`;
        }
        return param;
    }
    const getProdutos = async () => {
        const param = builParam();
        const [data, error] = await ProdutoService.index(param);
        console.log(data);
        if (!error) {
            setProdutos(data.list.data);
            setConfig(data.list);
        }
    }
    useEffect(getProdutos, [pesquisaValue]);
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
                <InputSearch placeholder={"Pesquise pelo o nome do produto"} button={"Buscar"} url={`/admin/estoque?pesquisa=${pesquisa ? pesquisa : ""}`} onChange={handleInputPesquisa} />

            </div >
            <hr />
            <table className="table container">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome do produto</th>
                        <th scope="col">Em estoque</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        produtos.map((produto, index) => <CardEstoque produto={produto} key={index} />)
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
        </AdmLayout>
    )
}

export default Estoque;