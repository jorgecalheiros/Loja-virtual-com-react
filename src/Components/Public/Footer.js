import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTshirt } from "@fortawesome/free-solid-svg-icons";

function Footer() {
    return (
        <footer className=" border-top py-3 my-4">
            <div className="container">
                <div className="col-md-4 d-flex align-items-center">
                    <span>
                        <FontAwesomeIcon icon={faTshirt} />
                    </span>
                    <p className="text-muted m-0 px-2">
                        By Jorge Calheiros de Sousa
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;