import { useEffect, useState } from "react";
import { useParams } from "react-router";

import ProdutoService from "../../Services/ProdutoService";
import AdmLayout from "../../Layouts/AdmLayout";

function ShowProdutoAdmin() {
    const [produto, setProduto] = useState({});
    const { idProduto } = useParams();
    const getProduto = async () => {
        const [data, error] = await ProdutoService.show(idProduto);
        if (!error) {
            const produto = data.produto;
            setProduto((prev) => ({
                ...prev,
                ["nome"]: produto.nome,
                ["preco"]: produto.preco,
                ["categoria"]: produto.categoria,
                ["foto"]: produto.foto,
                ["descricao"]: produto.descricao
            }))
        }
    }
    useEffect(getProduto, []);
    const deleteProduto = async () => {
        const [data, error] = await ProdutoService.destroy(idProduto);
        if (!error) {
            alert("Produto enviado para a lixeira com sucesso!");
            window.location.href = "/admin/produtos";
        }
    }

    return (
        <AdmLayout>
            <div className="container my-1 d-flex justify-content-center">
                <div className="card">
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
                        <button className="btn btn-danger" id="delete-produto" onClick={deleteProduto}>
                            Enviar para a lixeira
                        </button>
                    </div>
                </div>
            </div>
        </AdmLayout>
    )
}

export default ShowProdutoAdmin;