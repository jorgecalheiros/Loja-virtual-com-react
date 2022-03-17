import Footer from "../Components/Public/Footer";
import Header from "../Components/Public/Header";

function PublicLayout({ children, infoObj }) {
    return (
        <div>
            <Header infoObj={infoObj} />
            {children}
            <Footer />
        </div>
    )
}

export default PublicLayout;