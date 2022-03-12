import { NavLink } from "react-router-dom";

function CardCategoria({ obj }) {
    return (
        <li className="list-group-item">
            <NavLink to={"/?categoria=" + obj.slug} className={"card-link"}>
                {obj.nome}
            </NavLink>
        </li >
    )
}
export default CardCategoria;