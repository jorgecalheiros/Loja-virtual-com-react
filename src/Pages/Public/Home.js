import CardProduto from "../../Components/Public/CardProduto";
import Menu from "../../Components/Public/Menu";
import PublicLayout from "../../Layouts/PublicLayout";

function Home() {
    return (
        <PublicLayout>
            <div className="d-flex container  justify-content-between my-5">
                <div className="container d-md-flex flex-wrap">
                    <CardProduto />
                    <CardProduto />
                    <CardProduto />
                </div>
                <Menu />
            </div>
        </PublicLayout >
    )
}


export default Home;