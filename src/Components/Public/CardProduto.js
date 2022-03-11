import { NavLink } from "react-router-dom";

function CardProduto({ obj }) {
    return (
        <div className="card mx-lg-1 mb-1 flex-grow-1 --w-md-25 ">
            <NavLink to={"/"} className="text-reset text-decoration-none">
                <img src="..." className="card-img-cap" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Nome produto</h5>
                    <p className="card-text h-25">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                    </p>
                </div>
                <div className="card-body">
                    <span className="btn btn-primary">
                        Preço
                    </span>
                </div>
            </NavLink>
        </div>
    )
}

export default CardProduto;