import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTshirt } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header>

            <div class="navbar navbar-dark bg-dark box-shadow">
                <div class="container d-flex justify-content-between">
                    <NavLink to={"/"} className="navbar-brand d-flex align-items-center">
                        <FontAwesomeIcon icon={faTshirt} /><strong class="px-2">Loja Virtual</strong>
                    </NavLink>
                    <button class="navbar-toggler collapsed" data-bs-toggle="collapse" type="button" data-bs-target="#header">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
            </div>
            <div class="bg-dark collapse" id="header">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-8 col-md-7 py-4">
                            <h4 class="text-white">
                                Aviso...
                            </h4>
                            <p className="text-white">
                                Com roupas com preços baratos aqui, caso achar algo que o <br />
                                incomede entre em contato conosco
                            </p>
                        </div>
                        <div class="col-sm-4 offset-md-1 py-4">
                            <h4 class="text-white">Contato</h4>
                            <ul class="list-unstyle">
                                <li>
                                    <a href="#" class="text-white">Twitter</a>
                                </li>
                                <li>
                                    <a href="#" class="text-white">Facebook</a>
                                </li>
                                <li>
                                    <a href="#" class="text-white">Email</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header >
    )
}



export default Header;