import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


export default function RegisterPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function registerUser(ev) {
        ev.preventDefault()
        
        try {
            await axios.post("/register", {
                name, email, password
            })
    
            alert("Registration successfull")

        } catch (error) {
            alert("Registration failed or user already registered")
        }
    }

    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center">Register</h1>
                <form className="max-w-md mx-auto mt-2" onSubmit={registerUser}>
                    <input type="text" placeholder="Your name" value={name} onChange={ ev => setName(ev.target.value)}  />
                    <input type="email" placeholder="Your@email.com" value={email} onChange={ ev => setEmail(ev.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={ ev => setPassword(ev.target.value)} />
                    <button className="primary" >Register</button>
                    <div className="text-center text-gray-500 p-2">
                        Allready have an account? <Link className="underline text-black" to={"/login"}>Login </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}