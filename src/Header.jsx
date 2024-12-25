import { useNavigate } from "react-router-dom"

function Header(){

    const navigate = useNavigate();

    const handleLoginButton = () =>{
        navigate('/login');
    }
    const handleRegisterButton = () =>{
        navigate('/');
    }
    
    return (
        <header className="flex justify-center px-4 my-8 border-b-4 pb-8 border-amber-600">
            <p className="w-2/4 flex justify-start text-3xl font-bold font-mono">DBMS</p>
            <nav className="w-2/4 font-mono flex">
                <ul className="w-full flex justify-around items-center ">
                    <li className="bg-slate-500 hover:bg-slate-700 text-white  w-1/3  h-full  rounded-md flex justify-center items-center" onClick={handleLoginButton}>Login</li>
                    <li  className="bg-slate-500 hover:bg-slate-700 text-white w-1/3  h-full  rounded-md flex justify-center items-center" onClick={handleRegisterButton}>Register</li>
                </ul>
            </nav>
            
        </header>
    )
}

export default Header