import { useEffect, useState } from "react";

import PublicLayout from "../../Layouts/PublicLayout";
import ProdutoService from "../../Services/ProdutoService";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";


function ShowProduto() {
    const [produto, setProduto] = useState({});
    const { idProduto } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const [data, error] = await ProdutoService.show(idProduto);

            if (!error) {
                const produto = data.produto;
                setProduto(produto);
            }
        }
        fetchData();
    }, []);

    return (
        <PublicLayout>
            <div className="container my-5">
                <NavLink to={"/"} className={"text-reset text-decoration-none"}>
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} size="2x" />
                </NavLink>
                <div className="card my-2">
                    <img src={`http://localhost:8000/api/produtos/image/${produto.foto}`} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{produto.nome}</h5>
                        <p className="card-text">
                            {produto.descricao}
                        </p>
                    </div>
                    <div className="card-body">
                        <span className="btn btn-primary">
                            {produto.preco}R$
                        </span>
                    </div>
                    <div className="card-body">
                        <span className="btn btn-secondary --mr-5">
                            Adicionar ao carrinho
                        </span>
                        <span className="btn btn-primary">
                            Comprar
                        </span>
                    </div>
                </div>
            </div>
        </PublicLayout>
    )
}

export default ShowProduto;