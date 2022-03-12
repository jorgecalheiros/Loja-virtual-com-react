import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import ProdutoService from "../../Services/ProdutoService";
import CardProduto from "../../Components/Public/CardProduto";
import Menu from "../../Components/Public/Menu";
import PublicLayout from "../../Layouts/PublicLayout";

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search])
}

function Home() {
    const [produtos, setProdutos] = useState([]);

    let query = useQuery();
    let categoria = query.get("categoria");

    useEffect(() => {
        const fetchData = async () => {
            const [data, error] = await ProdutoService.index(categoria);

            if (!error) {
                const produtos = data.list.data;
                setProdutos(produtos);
            }
        }
        fetchData();
    }, [])
    return (
        <PublicLayout>
            <div className="d-flex container  justify-content-between my-5">
                <div className="container d-md-flex flex-wrap">
                    {
                        produtos.map((produto, key) => {
                            return <CardProduto obj={produto} key={key} />
                        })
                    }
                </div>
                <Menu />
            </div>
        </PublicLayout >
    )
}


export default Home;