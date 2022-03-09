import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import HelloWord from "../Pages/HelloWord";


function Router() {
    return (
        <Routes>
            <Route path="/helloword" element={<HelloWord />} />
        </Routes>
    )
}

export default Router;