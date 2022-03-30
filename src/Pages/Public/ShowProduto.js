import { useEffect, useState } from "react";
import $ from "jquery";

import PublicLayout from "../../Layouts/PublicLayout";
import ProdutoService from "../../Services/ProdutoService";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import RegistroService from "../../Services/RegistroService";

function ShowProduto() {
    const [produto, setProduto] = useState({});
    const { idProduto } = useParams();
    const [InputCompra, setInputCompra] = useState({
        idProduto: idProduto,
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

    const fetchCreate = async (dataForm) => {
        const [data, error] = await RegistroService.create(dataForm);
        if (!error) {
            return true;
        }
    }
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
            return (preco = preco * InputCompra.quantidade).toFixed(2);
        }
    }
    const validar = () => {
        InputCompra.precoTotal = somarPreco(produto.preco);
        const campos = [
            InputCompra.idProduto,
            InputCompra.quantidade,
            InputCompra.precoTotal,
            InputCompra.nome,
            InputCompra.sobrenome,
            InputCompra.email,
            InputCompra.numeroCartao,
            InputCompra.nomeCartao,
            InputCompra.validadeCartao
        ]

        const vazios = campos.filter(a => a == "");
        if (vazios.length > 0) {
            alert("Ainda há campos não preenchidos");
        } else if (InputCompra.quantidade > produto.estoque) {
            alert(`O limite de quantidade é: ${produto.estoque}`)
        } else {
            if (fetchCreate(InputCompra)) {
                console.log(InputCompra);
                alert(`Compra feita com sucesso! ${InputCompra.entregarEmCasa ? "Em breve chegara em sua casa" : "Busque na loja "}`);
                window.location.href = "/";
            } else {
                console.log("error");
            }
        }
    }
    const disableInputs = () => {
        const $inputs = $("[entregar-em-casa-input]");
        const resetarValor = (element) => {
            if (!InputCompra.entregarEmCasa) {
                element.value = "";
                InputCompra.rua = "";
                InputCompra.numero = "";
                InputCompra.bairro = "";
                InputCompra.complemento = "";
                InputCompra.estado = "";
                InputCompra.cidade = "";
                InputCompra.cep = "";
            }
        }
        $inputs.each((index, element) => { resetarValor(element) });
    }
    useEffect(disableInputs, [InputCompra.entregarEmCasa]);

    $(document).ready(() => {
        $("#numeroCartao").mask("0000000000000000");
        $("#validade").mask("00/00");
    })

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
                        <span className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#card-compra">
                            Comprar
                        </span>
                    </div>
                </div>
                <div className="modal fade" id="card-compra" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Comprar produto</h5>
                                <FontAwesomeIcon icon={faClose} className={"btn btn-primary"} data-bs-dismiss="modal" />
                            </div>
                            <div className="modal-body">
                                <div className="card">
                                    <div className="card-body overflow-auto --h-450px">
                                        <section>
                                            <h5>Produto: {produto.nome}</h5> <p className="text-muted">Preço: {produto.preco} R$</p><p className="text-muted">Em estoque: {produto.estoque}</p>
                                            <div className="mb-3">
                                                <label for={"quantidade"} className={"form-label"}> Insira a quantidade</label>
                                                <input className="form-control" id={"quatidade"} name="quantidade" type={"number"} onChange={handleInputCompra} max={produto.estoque} min={1} value={InputCompra.quantidade} />
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
                                                    <input name={"nome"} type={"text"} placeholder={"Nome"} className={"form-control"} onChange={handleInputCompra} autoComplete={"none"} />
                                                    <input name={"sobrenome"} type={"text"} placeholder={"Sobrenome"} className={"form-control"} onChange={handleInputCompra} autoComplete={"none"} />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label for={"email"} className={"form-label"}>Email: </label>
                                                <input id="email" name="email" type={"email"} className="form-control" onChange={handleInputCompra} autoComplete={"none"} />
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
                                                        <input name={"rua"} placeholder={"Rua"} type={"text"} className="form-control" entregar-em-casa-input="" onChange={handleInputCompra} disabled={!InputCompra.entregarEmCasa} autoComplete={"none"} />
                                                        <input name={"numero"} placeholder={"Numero"} type={"number"} className="form-control" entregar-em-casa-input="" onChange={handleInputCompra} min="1" disabled={!InputCompra.entregarEmCasa} autoComplete={"none"} />
                                                        <input name={"bairro"} placeholder={"Bairro"} type={"text"} className="form-control" entregar-em-casa-input="" onChange={handleInputCompra} disabled={!InputCompra.entregarEmCasa} autoComplete={"none"} />
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label for={"complemento"}>Complemento</label>
                                                    <input name={"complemento"} type={"text"} className="form-control" entregar-em-casa-input="" onChange={handleInputCompra} disabled={!InputCompra.entregarEmCasa} autoComplete={"none"} />
                                                </div>
                                                <div className="mb-3">
                                                    <label>Cidade e Estado</label>
                                                    <div className="d-flex">
                                                        <input name={"cidade"} placeholder={"Cidade"} type={"text"} className="form-control" entregar-em-casa-input="" onChange={handleInputCompra} disabled={!InputCompra.entregarEmCasa} autoComplete={"none"} />
                                                        <input name={"estado"} placeholder={"Estado"} type={"text"} className="form-control" entregar-em-casa-input="" onChange={handleInputCompra} maxLength={"2"} disabled={!InputCompra.entregarEmCasa} autoComplete={"none"} />
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label for={"cep"}>CEP: </label>
                                                    <input name={"cep"} type={"text"} className="form-control" entregar-em-casa-input="" onChange={handleInputCompra} id="cep" maxLength={"9"} disabled={!InputCompra.entregarEmCasa} autoComplete={"none"} />
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
                                                        <input type={"number"} id="numeroCartao" placeholder={"0000000000000000"} name={"numeroCartao"} className={"form-control"} onChange={handleInputCompra} autoComplete={"none"} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type={"text"} className={"form-control"} placeholder={"Nome inteiro"} name="nomeCartao" onChange={handleInputCompra} autoComplete={"none"} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type={"text"} className={"form-control"} id={"validade"} placeholder={"AA/MM"} name="validadeCartao" onChange={handleInputCompra} maxLength="5" autoComplete={"none"} />
                                                    </div>
                                                    <button className="btn btn-danger" onClick={validar}>
                                                        Pagar
                                                    </button>
                                                </section>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </PublicLayout >
    )
}

export default ShowProduto;