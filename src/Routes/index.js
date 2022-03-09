import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import HelloWord from "../Pages/HelloWord";
import Home from "../Pages/Public/Home";


function Router() {
    return (
        <Routes>
            <Route path="/helloword" element={<HelloWord />} />
            <Route path="/" element={<Home />} />
        </Routes>
    )
}

export default Router;