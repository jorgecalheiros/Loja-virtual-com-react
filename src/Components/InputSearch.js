import { NavLink } from "react-router-dom";

function InputSearch({ placeholder, button, url, onChange }) {
    return (
        <div className="input-group mb-3 my-2 w-50">
            <input name="search" type={"text"} placeholder={placeholder} className={"form-control"} id={"pesquisa"} onChange={onChange} />
            <NavLink to={url} className={"btn btn-primary"}>
                {button}
            </NavLink>
        </div>
    )
}

export default InputSearch;