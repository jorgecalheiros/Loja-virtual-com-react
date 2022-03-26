function CardEstoque({ produto }) {
    return (
        <tr>
            <td scope="row">{produto.id}</td>
            <td>{produto.nome}</td>
            <td>{produto.estoque}</td>
        </tr>
    )
}

export default CardEstoque; 