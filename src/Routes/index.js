import { Route, Routes } from "react-router-dom";

import HelloWord from "../Pages/HelloWord";
import Home from "../Pages/Public/Home";
import ShowProduto from "../Pages/Public/ShowProduto";


function Router() {
    return (
        <Routes>
            <Route path="/helloword" element={<HelloWord />} />
            <Route path="/" element={<Home />} />
            <Route path="/produto/:idProduto" element={<ShowProduto />} />
        </Routes>
    )
}

export default Router;