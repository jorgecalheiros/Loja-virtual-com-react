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

        </Routes>
    )
}

export default Router;