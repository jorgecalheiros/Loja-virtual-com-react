import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTshirt } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header>

            <div className="navbar navbar-dark bg-dark box-shadow">
                <div className="container d-flex justify-content-between">
                    <NavLink to={"/"} className="navbar-brand d-flex align-items-center">
                        <FontAwesomeIcon icon={faTshirt} /><strong className="px-2">Loja Virtual</strong>
                    </NavLink>
                    <button className="navbar-toggler collapsed" data-bs-toggle="collapse" type="button" data-bs-target="#header">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </div>
            <div className="bg-dark collapse py-2" id="header">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-md-7 py-4">
                            <h4 className="text-white">
                                Aviso...
                            </h4>
                            <p className="text-white">
                                Com roupas com preços baratos aqui, caso achar algo que o <br />
                                incomede entre em contato conosco
                            </p>
                        </div>
                        <div className="col-sm-4 offset-md-1 py-4">
                            <h4 className="text-white">Contato</h4>
                            <ul className="list-unstyle">
                                <li>
                                    <a href="#" className="text-white">Twitter</a>
                                </li>
                                <li>
                                    <a href="#" className="text-white">Facebook</a>
                                </li>
                                <li>
                                    <a href="#" className="text-white">Email</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center">
                        <ul className="nav col-12 col-lg-auto me-lg-auto justify-content-center mb-md-0">
                            <li>
                                <NavLink to={"/"} className="nav-link px-2 text-white">
                                    Home
                                </NavLink>
                            </li>
                        </ul>
                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                            <input type={"search"} className="form-control form-control-dark" placeholder="Pesquise..." aria-label="Search" />
                        </form>
                        <div className="text-end">
                            <button type="button" className="btn btn-outline-light me-2">Pesquisar</button>
                        </div>
                    </div>
                </div>
            </div>
        </header >
    )
}



export default Header;