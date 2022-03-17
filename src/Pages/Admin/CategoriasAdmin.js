import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router";

import CardCategoriaAdmin from "../../Components/Admin/CardCategoria";
import AdmLayout from "../../Layouts/AdmLayout";
import CategoriaService from "../../Services/CategoriaService";
import InputSearch from "../../Components/InputSearch";

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function CategoriasAdmin() {
    const [categorias, setCategorias] = useState([]);
    const [config, setConfig] = useState({});
    const [pesquisa, setPesquisa] = useState(null);
    const query = useQuery();
    const pesquisaValue = query.get("pesquisa");
    const buildParam = (page = 1) => {
        let param = `page=${page}`;
        if (pesquisa) {
            param += `&s=${pesquisaValue}`;
        }
        return param;
    }
    const getCategoria = async () => {
        const param = buildParam();
        const [data, error] = await CategoriaService.index(param);
        if (!error) {
            setCategorias(data.list.data);
            setConfig(data.list);
        }
    }
    useEffect(getCategoria, [pesquisaValue]);
    const changePage = async (page) => {
        const param = buildParam(page);
        const [data, error] = await CategoriaService.index(param);

        if (!error) {
            setCategorias(data.list);
            setCategorias(data.list.data);
        }
    }
    const handleInputPesquisa = (event) => {
        const { value } = event.target;
        setPesquisa(value);
    }
    const { per_page, total, current_page } = config;
    return (
        <AdmLayout>
            <div className="container my-2 px-1">
                <NavLink to={"/admin/create/categoria"} className={"btn btn-primary"}>
                    Cadastrar categoria
                </NavLink>
                <InputSearch placeholder={"Pesquise..."} button={"Buscar"} url={`/admin/categorias?pesquisa=${pesquisa ? pesquisa : ""}`} onChange={handleInputPesquisa} />
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