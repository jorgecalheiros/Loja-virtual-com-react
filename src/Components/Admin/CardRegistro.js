import { NavLink } from "react-router-dom";

function CardRegistro({ registro, infoObj }) {
    const formatarData = (dataParam) => {
        if (!dataParam) return "Não existe data";
        const dataSeparada = dataParam.split("T")[0];
        const dataArray = dataSeparada.split("-");
        const dia = dataArray[2]; //dia
        const mes = dataArray[1]; //mes
        const ano = dataArray[0]; //ano
        const dataFormatada = `${dia}/${mes}/${ano}`;
        return dataFormatada;
    }
    return (
        <tr>
            <td scope="row">{registro.id}</td>
            <td>{registro.produtos.nome}</td>
            <td>{registro.quantidade}</td>
            <td>{registro.precoTotal}</td>
            <td>{registro.nome}</td>
            <td>{registro.email}</td>
            <td>{formatarData(registro.created_at)}</td>
            <td>{formatarData(registro.updated_at)}</td>
            <td>
                <div className="d-flex">
                    <NavLink className={"btn btn-primary"} to={`/admin/registros/${registro.id}`}>
                        Detalhes
                    </NavLink>
                </div>
            </td>
        </tr>
    )
}

export default CardRegistro;