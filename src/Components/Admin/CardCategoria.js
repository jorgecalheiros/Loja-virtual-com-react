import { NavLink } from "react-router-dom"

function CardCategoriaAdmin({ categoria }) {
    return (
        <tr>
            <th scope="row">{categoria.id}</th>
            <td>{categoria.nome}</td>
            <td>{categoria.slug}</td>
            <td>
                <div className="d-flex">
                    <NavLink to={`/admin/update/categoria/${categoria.id}`} className={"btn btn-primary mx-2"}>
                        Alterar
                    </NavLink>
                </div>
            </td>
        </tr>
    )
}

export default CardCategoriaAdmin;
