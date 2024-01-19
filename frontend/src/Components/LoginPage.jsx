import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../userContext";

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)

    const{setUser} = useContext(UserContext)

    async function handleLogin(ev) {

        ev.preventDefault()

        try {
            const {data} = await axios.post("/login", {email, password})
            setUser(data)
            alert("Login sucessfull")
            setRedirect(true)

        } catch (error) {
            alert("Login failed")
        }   
    }
    if(redirect){
        return <Navigate to="/" />
    }

    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center">Login</h1>
                <form className="max-w-md mx-auto mt-2" onSubmit={handleLogin}>
                    <input type="email" placeholder="Your@email.com" value={email} onChange={ev => setEmail(ev.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={ev => setPassword(ev.target.value)} />
                    <button className="primary">Login</button>
                    <div className="text-center text-gray-500 p-2">Don't have an account? <Link className="underline text-black" to={"/register"}>Register now</Link></div>
                </form>
            </div>
        </div>
    )
}