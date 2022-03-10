import { NavLink } from "react-router-dom";

import CardCategoria from "./CardCategoria";

function Menu({ obj }) {
    return (
        <aside className="container w-25 m-0">
            <div className="card">
                <div className="card-body">
                    <NavLink to={"/"} className={"card-link"}>
                        Todos
                    </NavLink>
                </div>
                <ul className="list-group list-group-flush">
                    <CardCategoria />
                </ul>
            </div>
        </aside>
    )
}

export default Menu;