import { Route, Routes } from "react-router-dom";

import HelloWord from "../Pages/HelloWord";
import Home from "../Pages/Public/Home";
import ShowProduto from "../Pages/Public/ShowProduto";

//admin pages
import HomeAdmin from "../Pages/Admin/HomeAdmin";
import CreateUpdateProdutos from "../Pages/Admin/CreateUpdateProdutos";
import ProdutosAdmin from "../Pages/Admin/ProdutosAdmin";
import CategoriasAdmin from "../Pages/Admin/CategoriasAdmin";
import CreateUpdateCategoria from "../Pages/Admin/CreateUpdateCategoria";
import ShowProdutoAdmin from "../Components/Admin/ShowProdutoAdmin";
import ProdutosTrashAdmin from "../Pages/Admin/ProdutosTrashAdmin";
import RegistroAdmin from "../Pages/Admin/RegistrosAdmin";
import ShowRegistros from "../Pages/Admin/ShowRegistros";
import Estoque from "../Pages/Admin/Estoque";
import Dashboard from "../Pages/Admin/Dashboard";


function Router() {
    return (
        <Routes>
            <Route path="/helloword" element={<HelloWord />} />
            <Route path="/" element={<Home />} />
            <Route path="/produto/:idProduto" element={<ShowProduto />} />

            <Route path="/admin" element={<HomeAdmin />} />
            <Route path="/admin/create/produto" element={<CreateUpdateProdutos title={"Cadastrar produto"} button={"Cadastrar"} />} />
            <Route path="/admin/update/produto/:idProduto" element={<CreateUpdateProdutos title={"Alterar produto"} button={"Alterar"} />} />
            <Route path="/admin/produtos" element={<ProdutosAdmin />} />
            <Route path="/admin/lixeira" element={<ProdutosTrashAdmin />} />
            <Route path="/admin/produto/:idProduto" element={<ShowProdutoAdmin />} />
            <Route path="/admin/categorias" element={<CategoriasAdmin />} />
            <Route path="/admin/create/categoria" element={<CreateUpdateCategoria title={"Cadastrar categoria"} button={"Cadastrar"} />} />
            <Route path="/admin/update/categoria/:idCategoria" element={<CreateUpdateCategoria title={"Alterar categoria"} button={"Alterar"} />} />
            <Route path="/admin/registros" element={<RegistroAdmin />} />
            <Route path="/admin/registros/:idRegistro" element={<ShowRegistros />} />
            <Route path="/admin/estoque" element={<Estoque />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
    )
}

export default Router;