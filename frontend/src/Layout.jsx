import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
    return(
        <div className="py-4 px-8 p-4 flex flex-col min min-h-screen ">
            <Header/>
            <Outlet/>
        </div>
        
    )
}