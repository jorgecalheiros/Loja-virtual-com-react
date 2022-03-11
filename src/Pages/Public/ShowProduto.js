import PublicLayout from "../../Layouts/PublicLayout";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";


function ShowProduto() {

    const { idProduto } = useParams();

    return (
        <PublicLayout>
            <div className="container my-5">
                <NavLink to={"/"} className={"text-reset text-decoration-none"}>
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} size="2x" />
                </NavLink>
                <div className="card my-2">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Nome do produto</h5>
                        <p className="card-text">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                        </p>
                    </div>
                    <div className="card-body">
                        <span className="btn btn-secondary --mr-5">
                            Adicionar ao carrinho
                        </span>
                        <span className="btn btn-primary">
                            Comprar
                        </span>
                    </div>
                </div>
            </div>
        </PublicLayout>
    )
}

export default ShowProduto;