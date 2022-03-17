import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { NavLink } from "react-router-dom";

import CardCategoriaAdmin from "../../Components/Admin/CardCategoria";
import AdmLayout from "../../Layouts/AdmLayout";
import CategoriaService from "../../Services/CategoriaService";

function CategoriasAdmin() {
    const [categorias, setCategorias] = useState([]);
    const [config, setConfig] = useState({});

    const getCategoria = async () => {
        const param = `page=1`;
        const [data, error] = await CategoriaService.index(param);
        if (!error) {
            setCategorias(data.list.data);
            setConfig(data.list);
        }
    }
    useEffect(getCategoria, []);
    const changePage = async (page) => {
        const param = `page=${page}`;
        const [data, error] = await CategoriaService.index(param);

        if (!error) {
            setCategorias(data.list);
            setCategorias(data.list.data);
        }
    }
    const { per_page, total, current_page } = config;
    return (
        <AdmLayout>
            <div className="container my-2 px-1">
                <NavLink to={"/admin/create/categoria"} className={"btn btn-primary"}>
                    Cadastrar categoria
                </NavLink>
            </div >
            <table className="table container">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Slug</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((categoria, index) => < CardCategoriaAdmin categoria={categoria} key={index} />)}
                </tbody>
            </table>
            <div>
                <div className="container px-1">
                    <Pagination
                        activePage={current_page}
                        itemsCountPerPage={per_page}
                        totalItemsCount={!total ? 1 : total}
                        onChange={(pageNumber) => changePage(pageNumber)}
                        prevPageText={"Voltar"}
                        nextPageText={"Proximo"}
                        itemClass={"page-item"}
                        linkClass={"page-link"}
                    />
                </div>
            </div>
        </AdmLayout>
    )
}

export default CategoriasAdmin;