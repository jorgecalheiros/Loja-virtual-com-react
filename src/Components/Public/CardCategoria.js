import { NavLink } from "react-router-dom";

function CardCategoria() {
    return (
        <li className="list-group-item">
            <NavLink to={"/"} className={"card-link"}>
                Exemplo categoria
            </NavLink>
        </li>
    )
}
export default CardCategoria;