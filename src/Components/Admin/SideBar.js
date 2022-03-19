import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function SideBar() {
    return (
        <div className="d-flex flex-column flex-shirk-0 p-3 text-white bg-dark --w-280px ">
            <NavLink to={"/admin"} className={"d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"}>
                <FontAwesomeIcon icon={faHome} className={"px-2"} /> Pagina Inicial
            </NavLink>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li>
                    <NavLink to={"/admin"} className={"nav-link text-white"}>
                        DashBord
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/admin/produtos"} className={"nav-link text-white"}>
                        Produtos
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/admin/categorias"} className={"nav-link text-white"}>
                        Categorias
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/admin/lixeira"} className={"nav-link text-white"}>
                        Lixeira
                    </NavLink>
                </li>
            </ul>
        </div >
    )
}

export default SideBar;