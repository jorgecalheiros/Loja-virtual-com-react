import { Pie, PieChart, Cell } from "recharts";


function GraficoPizza({ data }) {
    return (
        <PieChart width={100} height={100}>
            <Pie data={data} dataKey={"valor"} outerRadius={50}>
                <Cell fill="blue" />
                <Cell fill="#22F1B7" />
            </Pie>
        </PieChart>
    )
}

export default GraficoPizza;