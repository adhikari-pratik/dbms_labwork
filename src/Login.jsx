import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({setUsername}) {

	const URL = import.meta.env.VITE_API_URL;
	localStorage.removeItem("userData");

    const navigate = useNavigate();
	const [formdata, setFormdata] = useState({
		username: "",
		password: "",
	});

	const handleChange = (e) => {
		setFormdata({
			...formdata,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await fetch(`${URL}/authenticate`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formdata),
		});
		const result = await response.json();
		if (response.ok) {
			console.log("Logged in successfully:", result);
			alert("Logged in successfully.");
            const usernameReceived = result.username;
            console.log(usernameReceived)
            setUsername(usernameReceived);
			localStorage.removeItem("username")
			localStorage.setItem("username", usernameReceived)
			// localStorage.setItem("userData", JSON.stringify(result)); 
            navigate("/home");
		} else {
			console.error("Error in Login.", result);
            alert("error in login")
		}
		setFormdata({
			username: "",
			password: "",
		});
	};

    const handleButtonClick = () =>{
        navigate("/");
    }

	return (
		<div className="w-96 bg-slate-500 flex flex-col justify-center self-center items-center rounded-lg hover:drop-shadow-2xl p-8 max-md:w-2/3">
			<form
				className="flex flex-col self-center text-white font-mono w-full"
				onSubmit={handleSubmit}
			>
				<div className=" flex justify-center items-center flex-col m-2 pb-4">
					<p className="font-semibold  text-3xl m-2 underline underline-offset-8 decoration-dotted ">
						Login
					</p>
				</div>

				<div className="flex flex-col justify-around pb-4 border-b-2">
					<div className="flex justify-around flex-col m-2">
						<label htmlFor="username" className="w-full">
							Username :
						</label>
						<input
							onChange={handleChange}
							value={formdata.username}
							type="text"
							placeholder="Username"
							name="username"
							id="username"
							required
							className="w-full self-start bg-slate-500 border-2 border-slate-300 rounded-md py-1 px-2 placeholder:text-slate-300 outline-none focus:border-white"
						></input>
					</div>

					<div className="flex justify-around flex-col m-2">
						<label htmlFor="password" className="w-full">
							Password :
						</label>
						<input
							onChange={handleChange}
							value={formdata.password}
							type="password"
							placeholder="Password"
							name="password"
							required
							id="password"
							className="w-full self-start bg-slate-500 border-2 border-slate-300 rounded-md py-1 px-2 placeholder:text-slate-300 outline-none focus:border-white"
						></input>
					</div>
				</div>

				<div className="flex justify-around mt-4">
					<button
						type="submit"
						className="bg-white text-black font-mono p-2 rounded-md hover:bg-slate-700 hover:text-white "
					>
						Login
					</button>
					<button
						type="button"
                        onClick={handleButtonClick}
						className="bg-white text-black font-mono p-2 rounded-md hover:bg-slate-700 hover:text-white "
					>
						Register
					</button>
				</div>
			</form>
		</div>
	);
}

export default Login;
