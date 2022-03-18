import { NavLink } from "react-router-dom";

function CardProdutoAdmin({ produto, infoObj }) {
    const formatarData = (dataParam) => {
        if (!dataParam) return "Não existe data";
        const dataSeparada = dataParam.split("T")[0];
        const dataArray = dataSeparada.split("-");
        const dia = dataArray[2]; //dia
        const mes = dataArray[1]; //mes
        const ano = dataArray[0]; //ano
        const dataFormatada = `${dia}/${mes}/${ano}`;
        return dataFormatada;
    }
    return (
        <tr>
            <th scope="row">{produto.id}</th>
            <td>{produto.nome}</td>
            <td>{produto.preco}R$</td>
            <td>{formatarData(produto.created_at)}</td>
            <td>{formatarData(produto.updated_at)}</td>
            <td>{formatarData(produto.deleted_at)}</td>
            <td>
                <div className="d-flex">
                    {!produto.deleted_at &&
                        <>
                            <NavLink to={`/admin/produto/${produto.id}`} className={"btn btn-primary mx-2"}>
                                Detalhes
                            </NavLink>
                            <NavLink to={`/admin/update/produto/${produto.id}`} className={"btn btn-primary mx-2"}>
                                Alterar
                            </NavLink>
                        </>
                    }
                    {produto.deleted_at &&
                        <>
                            <button className="btn btn-primary" produto-restore={produto.id} onClick={infoObj.funcaoRestauraProduto}>
                                Restaurar
                            </button>
                        </>
                    }
                </div>
            </td>
        </tr>
    )
}

export default CardProdutoAdmin;