import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useLocation } from "react-router";

import ProdutoService from "../../Services/ProdutoService";
import RegistroService from "../../Services/RegistroService";
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
    const [produtosMaisVendidos, setProdutosMaisVendidos] = useState([]);
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
    const getProdutosMaisVendidos = async () => {
        const [data, error] = await RegistroService.produtosMaisVendidos();
        if (!error) {
            setProdutosMaisVendidos(data.list);
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
    useEffect(getProdutosMaisVendidos, []);
    const { current_page, per_page, total } = configRequest;
    const infoObj = {
        header: {
            rotaPesquisa: `?pesquisa=${pesquisaValue ? pesquisaValue : ""}`,
            functionOnChangeInputPesquisa: handleInputPesquisa
        }
    }
    return (
        <PublicLayout infoObj={infoObj}>
            <div className="container justify-content-between my-5">
                <div className="carousel slide" data-bs-ride="carousel" id="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active w-100 bg-dark d-flex" style={{ width: "100%", height: "600px" }}>
                            <div style={{
                                width: "100%",
                                height: "100%"
                            }}>
                                <h1 className="text-white m-4">
                                    Bem vindo á loja virtual
                                </h1>
                            </div>
                        </div>
                        {produtosMaisVendidos.length > 0 &&
                            produtosMaisVendidos.map((registro, index) => {
                                return (
                                    <div className="carousel-item" key={index} style={{ width: "100%", height: "600px" }}>
                                        <img src={`http://localhost:8000/api/produtos/image/${registro.produtos.foto}`} style={{
                                            width: "100%",
                                            height: "100%"
                                        }} />
                                        <div className="carousel-caption d-mb-block d-flex justify-content-end align-items-center">
                                            <h2 className="mx-2">{registro.produtos.nome} por</h2>
                                            <h1>{registro.produtos.preco}</h1>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <a className="carousel-control-prev" href="#carousel" role="button" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carousel" role="button" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
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