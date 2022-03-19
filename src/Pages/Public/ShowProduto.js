import { useEffect, useState } from "react";
import $ from "jquery";

import PublicLayout from "../../Layouts/PublicLayout";
import ProdutoService from "../../Services/ProdutoService";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function ShowProduto() {
    const [produto, setProduto] = useState({});
    const [InputCompra, setInputCompra] = useState({
        produto: "",
        quantidade: 1,
        precoTotal: "",
        entregarEmCasa: false,
        nome: "",
        sobrenome: "",
        email: "",
        rua: "",
        numero: "",
        bairro: "",
        complemento: "",
        cidade: "",
        estado: "",
        cep: "",
        numeroCartao: "",
        nomeCartao: "",
        validadeCartao: ""
    })
    const handleInputCompra = (event) => {
        const { name, value, checked, type } = event.target;
        if (type == "checkbox") {
            setInputCompra((prev) => ({
                ...prev,
                [name]: checked
            }))
        } else {
            setInputCompra((prev) => ({
                ...prev,
                [name]: value
            }))
        }

    }
    const { idProduto } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const [data, error] = await ProdutoService.show(idProduto);

            if (!error) {
                const produto = data.produto;
                setProduto(produto);
            }
        }
        fetchData();
    }, []);
    const somarPreco = (preco) => {
        if (InputCompra.quantidade) {
            return preco = preco * InputCompra.quantidade;
        }
    }
    const ShowCard = () => {
        const cardDeCompra = $("#div-card-compra");
        cardDeCompra.removeClass("d-none");
    }
    const HideCard = () => {
        const cardDeCompra = $("#div-card-compra");
        cardDeCompra.addClass("d-none");
    }
    console.log(InputCompra);
    return (
        <PublicLayout>
            <div className="container my-5 d-flex justify-content-center">
                <NavLink to={"/"} className={"text-reset text-decoration-none"}>
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} size="2x" />
                </NavLink>
                <div className="card my-2 w-50">
                    <img src={`http://localhost:8000/api/produtos/image/${produto.foto}`} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{produto.nome}</h5>
                        <p className="card-text">
                            {produto.descricao}
                        </p>
                    </div>
                    <div className="card-body">
                        <span className="btn btn-primary">
                            {produto.preco}R$
                        </span>
                    </div>
                    <div className="card-body">
                        <span className="btn btn-secondary --mr-5">
                            Adicionar ao carrinho
                        </span>
                        <span className="btn btn-primary" onClick={ShowCard}>
                            Comprar
                        </span>
                    </div>
                </div>
                <div className="card position-absolute d-none w-50 " id="div-card-compra">
                    <div className="card-body d-flex align-items-center justify-content-between">
                        <h1>Comprar produto</h1>
                        <FontAwesomeIcon icon={faClose} className={"btn btn-primary"} onClick={HideCard} />
                    </div>
                    <hr />
                    <div className="card-body overflow-auto --h-450px">
                        <section>
                            <h5>Produto: {produto.nome}</h5> <p className="text-muted">Preço: {produto.preco} R$</p>
                            <div className="mb-3">
                                <label for={"quantidade"} className={"form-label"}> Insira a quantidade</label>
                                <input className="form-control" id={"quatidade"} name="quantidade" type={"number"} onChange={handleInputCompra} max={10} min={1} value={InputCompra.quantidade} />
                            </div>
                            <div className="mb-3">
                                <input name="entregarEmCasa" id="entregarEmCasa" className="form-check-input" type={"checkbox"} onChange={handleInputCompra} value={true} />
                                <label for={"entregarEmCasa"} className={"form-check-label mx-2"}> Entregar em casa ?</label>
                            </div>
                            <hr />
                            <div className="mb-3">
                                <strong>Total: {somarPreco(produto.preco)} R$</strong>
                            </div>
                        </section>
                        <hr />
                        <section>
                            <h5>Informações do comprador</h5>
                            <div className="mb-3">
                                <label for={"nomeSobrenome"} className={"form-label"}>Nome e sobrenome: </label>
                                <div className="d-flex">
                                    <input name={"nome"} type={"text"} placeholder={"Nome"} className={"form-control"} onChange={handleInputCompra} />
                                    <input name={"sobrenome"} type={"text"} placeholder={"Sobrenome"} className={"form-control"} onChange={handleInputCompra} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label for={"email"} className={"form-label"}>Email: </label>
                                <input id="email" name="email" type={"email"} className="form-control" onChange={handleInputCompra} />
                            </div>
                        </section>
                        <hr />
                        <section>
                            <h5>Recebimento/Retira do(s) produto(s)</h5>
                            <div className="mb-3">
                                {InputCompra.entregarEmCasa && <span className="text-danger">Desmarcado</span>}
                                <p className={InputCompra.entregarEmCasa && "text-muted"}>
                                    Vou buscar meu pedido na loja
                                </p>
                                {!InputCompra.entregarEmCasa && <span className="text-danger">Desmarcado</span>}
                                <p className={!InputCompra.entregarEmCasa && "text-muted"}>
                                    Vou receber o meu pedido em casa
                                </p>
                            </div>
                        </section>
                        <hr />
                        <section>
                            {!InputCompra.entregarEmCasa && <span className="text-danger">Desmarcado</span>}
                            <div className={!InputCompra.entregarEmCasa && "text-muted"}>
                                <h6>Preencha seu endereço caso tenha optado por receber seu pedido em casa <span className="text-danger">*</span></h6>
                                <div className="mb-3">
                                    <label>Rua, Numero, Bairro</label>
                                    <div className="d-flex">
                                        <input name={"rua"} placeholder={"Rua"} type={"text"} className="form-control" onChange={handleInputCompra} value={InputCompra.rua} />
                                        <input name={"numero"} placeholder={"Numero"} type={"number"} className="form-control" onChange={handleInputCompra} value={InputCompra.numero} min="1" />
                                        <input name={"bairro"} placeholder={"Bairro"} type={"text"} className="form-control" onChange={handleInputCompra} value={InputCompra.bairro} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label for={"complemento"}>Complemento</label>
                                    <input name={"complemento"} type={"text"} className="form-control" onChange={handleInputCompra} value={InputCompra.complemento} />
                                </div>
                                <div className="mb-3">
                                    <label>Cidade e Estado</label>
                                    <div className="d-flex">
                                        <input name={"cidade"} placeholder={"Cidade"} type={"text"} className="form-control" onChange={handleInputCompra} value={InputCompra.cidade} />
                                        <input name={"estado"} placeholder={"Estado"} type={"text"} className="form-control" onChange={handleInputCompra} value={InputCompra.estado} maxLength={"2"} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label for={"cep"}>CEP: </label>
                                    <input name={"cep"} type={"text"} className="form-control" onChange={handleInputCompra} value={InputCompra.cep} id="cep" maxLength={"8"} />
                                </div>
                            </div>
                        </section>
                        <hr />
                        <section>
                            <div className="mb-3">
                                <h5>Formas de pagamento</h5>
                                <section>
                                    <div className="mb-3">
                                        <span className="btn btn-primary mb-3">Cartão</span>
                                        <input type={"number"} name={"numeroCartao"} className={"form-control"} placeholder={"Numero do cartão"} onChange={handleInputCompra} />
                                    </div>
                                    <div className="mb-3">
                                        <input type={"text"} className={"form-control"} placeholder={"Nome inteiro"} name="nomeCartao" onChange={handleInputCompra} />
                                    </div>
                                    <div className="mb-3">
                                        <input type={"text"} className={"form-control"} placeholder={"validade: MM/AA"} name="validadeCartao" onChange={handleInputCompra} />
                                    </div>
                                    <button className="btn btn-danger">
                                        Pagar
                                    </button>
                                </section>
                            </div>
                        </section>
                    </div>
                </div>
            </div >
        </PublicLayout >
    )
}

export default ShowProduto;