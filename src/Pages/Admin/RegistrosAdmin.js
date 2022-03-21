import React, { useEffect, useState } from "react"
import { useLocation } from "react-router"
import Pagination from "react-js-pagination";

import ProdutoService from "../../Services/ProdutoService";
import AdmLayout from "../../Layouts/AdmLayout";
import RegistroService from "../../Services/RegistroService";
import InputSearch from "../../Components/InputSearch";
import CardRegistro from "../../Components/Admin/CardRegistro";


function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}
function RegistroAdmin() {
    const [registros, setRegistros] = useState([]);
    const [configs, setConfig] = useState({});
    const [pesquisa, setPesquisa] = useState(null);

    const query = useQuery();
    const pesquisaValue = query.get("pesquisa");

    const builParam = (page = 1) => {
        let param = `page=${page}`;

        if (pesquisa) {
            param += `&s=${pesquisaValue}`;
        }
        return param;
    }
    const getRegistros = async () => {
        const param = builParam();
        const [data, error] = await RegistroService.index(param);

        if (!error) {
            setRegistros(data.list.data);
            setConfig(data.list);
        }
    }
    useEffect(getRegistros, [pesquisaValue]);
    const changePage = async (page) => {
        const param = builParam(page);
        const [data, error] = await RegistroService.index(param);

        if (!error) {
            setRegistros(data.list.data);
            setConfig(data.list);
        }
    }
    const handleInputPesquisa = (event) => {
        const { value } = event.target;
        setPesquisa(value);
    }
    const { current_page, per_page, total } = configs;
    return (
        <AdmLayout>
            <div className="container my-2 px-1">
                <InputSearch placeholder={"Pesquise pelo o nome do comprador..."} button={"Buscar"} url={`/admin/registros?pesquisa=${pesquisa ? pesquisa : ""}`} onChange={handleInputPesquisa} />
            </div >
            <hr />
            <table className="table container">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome do produto</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Preço Total</th>
                        <th scope="col">Nome do comprador</th>
                        <th scope="col">Email do comprador</th>
                        <th scope="col">Criado</th>
                        <th scope="col">Alterado</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        registros.map((registro, index) => <CardRegistro registro={registro} key={index} />)
                    }
                </tbody>
            </table>
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
        </AdmLayout >
    )
}

export default RegistroAdmin;