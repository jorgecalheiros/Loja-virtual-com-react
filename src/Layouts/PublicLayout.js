import Footer from "../Components/Public/Footer";
import Header from "../Components/Public/Header";

function PublicLayout({ children }) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default PublicLayout;