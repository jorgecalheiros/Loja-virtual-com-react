import { NavLink } from "react-router-dom";

function CardProdutoAdmin({ produto }) {
    return (
        <tr>
            <th scope="row">{produto.id}</th>
            <td>{produto.nome}</td>
            <td>{produto.preco}R$</td>
            <td>
                <div className="d-flex">
                    <NavLink to={`/admin/produto/${produto.id}`} className={"btn btn-primary mx-2"}>
                        Detalhes
                    </NavLink>
                    <NavLink to={`/admin/update/produto/${produto.id}`} className={"btn btn-primary mx-2"}>
                        Alterar
                    </NavLink>
                </div>
            </td>
        </tr>
    )
}

export default CardProdutoAdmin;