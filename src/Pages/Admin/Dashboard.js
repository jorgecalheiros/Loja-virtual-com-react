import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTshirt, faClose } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";

import AdmLayout from "../../Layouts/AdmLayout.js";
import GraficoPizza from "../../Components/Admin/GraficoPizza.js";
import RegistroService from "../../Services/RegistroService";
import GraficoColuna from "../../Components/Admin/GraficoColunas.js";

function Dashboard() {
    const [registros, setRegistros] = useState([]);
    const [tamanhoRegistros, setTamanhoRegistro] = useState(0);
    const [tamanhoRegistrosMesPassado, setTamanhoRegistrosMesPassado] = useState([]);
    const [meta, setMeta] = useState(50);
    const [ganho, setGanhando] = useState(0);
    const [diario, setDiario] = useState(0);
    const [semanal, setSemanal] = useState(0);
    const [mensal, setMensal] = useState(0);
    const [maisVendidos, setMaisVendidos] = useState([]);
    const mesAtual = new Date().getMonth() + 1;
    const getMoth = (data) => {
        if (data) {
            let dataArray = data.split("T")[0];
            dataArray = dataArray.split("-");
            const mes = dataArray[1];
            return mes;
        }
    }
    const getDay = (data) => {
        if (data) {
            let dataArray = data.split("T")[0];
            dataArray = dataArray.split("-");
            const dia = dataArray[2];
            return dia;
        }
    }
    const getRegistros = async () => {
        const [data, error] = await RegistroService.list();
        if (!error) {
            setRegistros(data.list);
            let valorganho = 0;
            const dias = new Set();
            const registrosMesAtual = data.list.filter(registro => {
                const mes = getMoth(registro.created_at);
                return mes == mesAtual;
            });
            const percorrerDias = (dia) => {
                const registros = registrosMesAtual.filter(registro => getDay(registro.created_at) == dia);
                return registros;
            }
            registrosMesAtual.map(registro => {
                const dia = getDay(registro.created_at);
                dias.add(dia);
            });
            dias.forEach(dia => {
                let somaValores = 0;
                const registros = percorrerDias(dia);
                registros.map(registro => {
                    somaValores = somaValores + parseFloat(registro.precoTotal);
                });
                valorganho = valorganho + somaValores;
            })
            setGanhando(valorganho.toFixed(2));
            setTamanhoRegistro(registrosMesAtual.length);
        }
    };
    const getRegistrosMesPassado = async () => {
        const [data, error] = await RegistroService.list();
        if (!error) {
            const mesPassado = mesAtual - 1;
            const semana = new Set();
            const dias = new Set();
            const registrosMesPassado = data.list.filter(registro => {
                const mes = getMoth(registro.created_at);
                return mes == mesPassado;
            });
            const percorrerDias = (dia) => {
                const registros = registrosMesPassado.filter(registro => getDay(registro.created_at) == dia);
                return registros;
            }
            if (registrosMesPassado.length > 0) {
                let valorDiario = 0;
                let valorSemanal = 0;
                let valorMensal = 0;
                registrosMesPassado.map(registros => {
                    const dia = getDay(registros.created_at);
                    dias.add(dia);
                });
                dias.forEach((dia) => {
                    let somaPrecos = 0;
                    const registros = percorrerDias(dia);
                    registros.map(registro => somaPrecos = somaPrecos + parseFloat(registro.precoTotal));
                    if (valorDiario < somaPrecos) {
                        valorDiario = somaPrecos;
                    }
                })
                setDiario(valorDiario.toFixed(2));

                registrosMesPassado.map(registros => {
                    const dia = getDay(registros.created_at);
                    if (semana.size < 7) {
                        semana.add(dia);
                    }
                });
                semana.forEach((dia) => {
                    let somaPrecos = 0;
                    const registros = percorrerDias(dia);
                    registros.map(registro => somaPrecos = somaPrecos + parseFloat(registro.precoTotal));
                    valorSemanal = valorSemanal + somaPrecos;
                })
                setSemanal(valorSemanal.toFixed(2));

                dias.forEach(dia => {
                    let somaPrecos = 0;
                    const registros = percorrerDias(dia);
                    registros.map(registro => somaPrecos = somaPrecos + parseFloat(registro.precoTotal));
                    valorMensal = valorMensal + somaPrecos;
                })
                setMensal(valorMensal.toFixed(2));

            }
            setTamanhoRegistrosMesPassado(registrosMesPassado.length);
        }
    }
    const getMaisVendidos = async () => {
        const [data, error] = await RegistroService.produtosMaisVendidos();
        if (!error) {
            setMaisVendidos(data.list);
        }
    }
    useEffect(getMaisVendidos, []);
    useEffect(getRegistros, []);
    useEffect(getRegistrosMesPassado, []);
    useEffect(() => {
        const metaDefault = 50;
        if (tamanhoRegistrosMesPassado < tamanhoRegistros) {
            setMeta(metaDefault)
        } else if (tamanhoRegistrosMesPassado > tamanhoRegistros) {
            setMeta(tamanhoRegistrosMesPassado)
        };
    }, [tamanhoRegistros, tamanhoRegistrosMesPassado]);
    let novaMeta = meta - tamanhoRegistros;
    if (novaMeta < 0) novaMeta = 0;
    const data = [
        { name: "Meta atual", valor: novaMeta },
        { name: "Meta", valor: tamanhoRegistros }
    ];
    return (
        <AdmLayout>
            <div className="container">
                <header className="d-flex justify-content-between align-items-center">
                    <h1>Dashboard</h1>
                </header>
                <hr />
                <section className="d-flex flex-wrap">
                    <div className="card w-50 flex-grow-1 mx-2 my-2">
                        <div className="card-body d-flex justify-content-between">
                            <header>
                                <FontAwesomeIcon icon={faTshirt} />
                                <strong className="px-2">
                                    Loja Virtual
                                </strong>
                            </header>
                            <p>Faturamento</p>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h2>Diário: </h2><h2>{diario}R$</h2>
                            </div>
                            <div className="d-flex justify-content-between text-muted">
                                <h4>Semanal: </h4><h4>{semanal}R$</h4>
                            </div>
                            <div className="d-flex justify-content-between text-muted">
                                <h4>Mensal: </h4><h4>{mensal}R$</h4>
                            </div>
                        </div>
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <h5>Metas de vendas por mes</h5>
                            <div className="d-flex align-items-center">
                                <div>
                                    <div className="d-flex align-items-center"><span className=""><strong>Meta:</strong></span><div className="--bg-blue text-white px-2 mx-2 my-1 rounded w-100">{meta} vendas</div></div>
                                    <div className="d-flex align-items-center"><span className=""><strong>Atual:</strong></span><div className="--bg-green text-white px-2 mx-2 my-1 w-100 rounded">{tamanhoRegistros} vendas</div></div>
                                </div>
                                <GraficoPizza data={data} />
                            </div>
                        </div>
                        {meta < tamanhoRegistros &&
                            <div className="card-body">
                                <h4>Meta batida</h4>
                                <p className="text-success"><strong>Parabéns !!!</strong></p>
                            </div>
                        }
                    </div>
                    <div className="card h-25  mx-2 my-2">
                        <div className="card-body">
                            <div className="my-2">
                                <h3 className="mb-3">Ganhando no momento: </h3>
                                <hr />
                                <h3 className="text-success light">{ganho}R$</h3>
                            </div>
                        </div>
                    </div>
                    <div className="card mx-2 my-2 flex-grow-1">
                        <div className="card-body">
                            <h3>Produtos mais vendidos: </h3>
                            <hr />
                            <div className="d-flex">
                                <GraficoColuna data={maisVendidos} dataKey={"quantidade"} color={"blue"} />
                                <GraficoColuna data={maisVendidos} dataKey={"precoTotal"} color={"red"} />
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        </AdmLayout >
    )
}

export default Dashboard;