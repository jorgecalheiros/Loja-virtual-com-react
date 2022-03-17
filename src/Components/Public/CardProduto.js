import { NavLink } from "react-router-dom";

function CardProduto({ obj }) {
    return (
        <div className="card mx-lg-1 mb-1 flex-grow-1 --w-md-25 ">
            <NavLink to={`/produto/${obj.id}`} className="text-reset text-decoration-none">
                <img src={`http://localhost:8000/api/produtos/image/${obj.foto}`} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{obj.nome}</h5>
                    <p className="card-text --h-25">
                        {obj.descricao}
                    </p>
                </div>
                <div className="card-body">
                    <span className="btn btn-primary">
                        {obj.preco} R$
                    </span>
                </div>
            </NavLink>
        </div>
    )
}

export default CardProduto;