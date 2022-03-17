import SideBar from "../Components/Admin/SideBar";

function AdmLayout({ children }) {
    return (
        <div className="d-flex">
            <SideBar />
            <main className="w-100 --h-auto">
                {children}
            </main>
        </div>
    )
}

export default AdmLayout;