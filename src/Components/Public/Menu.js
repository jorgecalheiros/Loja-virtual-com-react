import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import CategoriaService from "../../Services/CategoriaService";
import CardCategoria from "./CardCategoria";

function Menu() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const [data, error] = await CategoriaService.getAll();

            if (!error) {
                const categorias = data.list;
                setCategorias(categorias);
            }
        }
        fetchData();
    }, [])
    return (
        <aside className="container w-25 --d-sm-none">
            <div className="card">
                <div className="card-body">
                    <NavLink to={"/"} className={"card-link"}>
                        Todos
                    </NavLink>
                </div>
                <ul className="list-group list-group-flush">
                    {
                        categorias.map((categoria, key) => {
                            return <CardCategoria obj={categoria} key={key} />
                        })
                    }
                </ul>
            </div>
        </aside>
    )
}

export default Menu;