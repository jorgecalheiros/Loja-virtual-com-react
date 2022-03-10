import Menu from "../../Components/Public/Menu";
import PublicLayout from "../../Layouts/PublicLayout";

function Home() {
    return (
        <PublicLayout>
            <div className="d-flex container  justify-content-between my-5">
                <h1>
                    Home
                </h1>
                <Menu />
            </div>
        </PublicLayout >
    )
}


export default Home;