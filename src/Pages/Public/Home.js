import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useLocation } from "react-router";

import ProdutoService from "../../Services/ProdutoService";
import CardProduto from "../../Components/Public/CardProduto";
import Menu from "../../Components/Public/Menu";
import PublicLayout from "../../Layouts/PublicLayout";

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Home() {
    const [produtos, setProdutos] = useState([]);
    const [configRequest, setConfigRequest] = useState({});
    const [pesquisaValue, setPesquisaValue] = useState(null);
    const query = useQuery();
    const categoria = query.get("categoria");
    const pesquisa = query.get("pesquisa");

    const handleInputPesquisa = (event) => {
        const { value } = event.target;
        setPesquisaValue(value);
    }
    const buildParam = (page = 1) => {
        let param = `page=${page}`;

        if (categoria) {
            param += `&categoria=${categoria}`;
        }
        if (pesquisa) {
            param += `&s=${pesquisa}`;
        }
        return param;

    }
    const getProdutosByCategoria = async () => {
        let param = buildParam();
        const [data, error] = await ProdutoService.index(param);

        if (!error) {
            setProdutos(data.list.data);
            setConfigRequest(data.list);
        }
    }
    const changePage = async (number) => {
        let param = buildParam(number);
        const [data, error] = await ProdutoService.index(param);

        if (!error) {
            const produtos = data.list.data;
            setConfigRequest(data.list);
            setProdutos(produtos);
        }
    }
    useEffect(getProdutosByCategoria, [categoria, pesquisa]);
    const { current_page, per_page, total } = configRequest;
    const infoObj = {
        header: {
            rotaPesquisa: `?pesquisa=${pesquisaValue ? pesquisaValue : ""}`,
            functionOnChangeInputPesquisa: handleInputPesquisa
        }
    }
    return (
        <PublicLayout infoObj={infoObj}>
            <div className="d-flex container  justify-content-between my-5">
                <div className="container d-md-flex flex-wrap">
                    {
                        produtos.map((produto, key) => {
                            return <CardProduto obj={produto} key={key} />
                        })
                    }
                    <div className="container p-1">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <Pagination
                                    totalItemsCount={total}
                                    activePage={current_page}
                                    itemsCountPerPage={per_page}
                                    onChange={(pageNumber) => changePage(pageNumber)}
                                    nextPageText={"Proximo"}
                                    prevPageText={"Voltar"}
                                    itemClass={"page-item"}
                                    linkClass={"page-link"}
                                />
                            </ul>
                        </nav>
                    </div>
                </div>
                <Menu />
            </div>
        </PublicLayout >
    )
}


export default Home;