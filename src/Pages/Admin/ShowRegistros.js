import { useEffect, useState } from "react";
import { useParams } from "react-router";

import AdmLayout from "../../Layouts/AdmLayout";
import RegistroService from "../../Services/RegistroService";

function ShowRegistros() {
    const [registro, setRegistro] = useState({});
    const { idRegistro } = useParams();

    const getRegistro = async () => {
        const [data, error] = await RegistroService.show(idRegistro);
        if (!error) {
            setRegistro(data.registro);
        }
    }
    useEffect(getRegistro, []);
    return (
        <AdmLayout>
            <div className="card">
                <h1>Registro</h1>
                <div className="card-body">
                    <strong>Nome do produto: </strong>{registro.produtos ? registro.produtos.nome : "Carregando..."}
                    <br />
                    <strong>Preço do produto: </strong>{registro.produtos ? registro.produtos.preco : "Carregando..."}
                </div>
                <hr />
                <div className="card-body">
                    <strong>Quantidade comprada: </strong>{registro.quantidade}
                    <br />
                    <strong>Nome do comprador: </strong>{registro.nome}
                    <br />
                    <strong>Sobrenome do comprador: </strong>{registro.sobrenome}
                    <br />
                    <strong>Email do comprador: </strong>{registro.email}
                </div>
                <hr />
                <div className="card-body">
                    <strong>Bairro:</strong>{registro.bairro}
                    <br />
                    <strong>Rua: </strong>{registro.rua}
                    <br />
                    <strong>Numero: </strong>{registro.numero}
                    <br />
                    <strong>Complemento: </strong>{registro.complemento}
                    <br />
                    <strong>Cidade: </strong>{registro.cidade}
                    <br />
                    <strong>Estado: </strong>{registro.estado}
                    <br />
                    <strong>CEP: </strong>{registro.cep}
                </div>
                <hr />
                <div className="card-body">
                    <strong>Numero do cartão: </strong>{registro.numeroCartao}
                    <br />
                    <strong>Nome do cartão: </strong>{registro.nomeCartao}
                    <br />
                    <strong>Validade do cartão: </strong>{registro.validadeCartao}
                </div>
            </div>
        </AdmLayout>
    )
}

export default ShowRegistros;