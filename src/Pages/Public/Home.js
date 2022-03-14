import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

import ProdutoService from "../../Services/ProdutoService";
import CardProduto from "../../Components/Public/CardProduto";
import Menu from "../../Components/Public/Menu";
import PublicLayout from "../../Layouts/PublicLayout";

function Home() {
    const [produtos, setProdutos] = useState([]);
    const [configRequest, setConfigRequest] = useState({});

    useEffect(() => {
        const fetchData = async (page = 1) => {
            const [data, error] = await ProdutoService.index(page);

            if (!error) {
                const produtos = data.list.data;
                setConfigRequest(data.list);
                setProdutos(produtos);
            }
        }
        fetchData();
    }, []);
    const changePage = async (page = 1) => {
        const [data, error] = await ProdutoService.index(page);

        if (!error) {
            const produtos = data.list.data;
            setConfigRequest(data.list);
            setProdutos(produtos);
        }
    }
    const { current_page, per_page, total } = configRequest;
    return (
        <PublicLayout>
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