import { useState } from "react";

function Form() {
	const URL = import.meta.env.VITE_API_URL;

	const [formdata, setFormdata] = useState({
		fName: "",
		mName: "",
		lName: "",
		address: "",
		email: "",
		phone: "",
		username: "",
		password: "",
		repassword: "",
		faculty: "",
		university: "",
		rollno: "",
		adminKey: "",
	});

	const handleChange = (e) => {
		setFormdata({
			...formdata,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await fetch(`${URL}/submit-user`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formdata),
		});
		const result = await response.json();
		if(response.ok){
			console.log("Form submitted successfully:", result);
			alert("Form submitted successfully.")
		}else{
			console.error("Error in form submission.",result)
		}
		setFormdata({
			fName: "",
			mName: "",
			lName: "",
			address: "",
			email: "",
			phone: "",
			username: "",
			password: "",
			repassword: "",
			faculty: "",
			university: "",
			rollno: "",
			adminKey: "",
		});
	};

	return (
		<div className="w-1/2 bg-slate-500 flex flex-col justify-center self-center items-center rounded-lg hover:drop-shadow-2xl p-4 max-md:w-2/3">
			<form
				className="flex flex-col self-center text-white font-mono w-full"
				onSubmit={handleSubmit}
			>
				<div className=" flex justify-center items-center flex-col m-2 pb-4">
					<p className="font-semibold  text-3xl m-2 underline underline-offset-8 decoration-dotted ">
						Registration Form
					</p>
					<p className="">Fill this form with details up-to-date</p>
				</div>

				<div className="flex flex-col justify-around p-2 border-b-2">
					<div className="flex flex-col justify-around m-2">
						<label htmlFor="fName" className="w-full">
							Name :
						</label>
						<div className="flex justify-between flex-wrap gap-4">
							<input
								onChange={handleChange}
								value={formdata.fName}
								type="text"
								placeholder="First Name"
								name="fName"
								id="fName"
								required
								className="bg-slate-500 border-2 border-slate-300 rounded-md py-1 px-2 placeholder:text-slate-300 outline-none focus:border-white"
							></input>
							<input
								onChange={handleChange}
								value={formdata.mName}
								type="text"
								placeholder="Middle Name"
								name="mName"
								id="mName"
								className="bg-slate-500 border-2 border-slate-300 rounded-md py-1 px-2 placeholder:text-slate-300 outline-none focus:border-white"
							></input>
							<input
								onChange={handleChange}
								value={formdata.lName}
								type="text"
								placeholder="Last Name"
								name="lName"
								id="lName"
								required
								className="bg-slate-500 border-2 border-slate-300 rounded-md py-1 px-2 placeholder:text-slate-300 outline-none focus:border-white"
							></input>
						</div>
					</div>

					<div className="flex justify-around flex-col m-2">
						<label htmlFor="address" className="w-full">
							Address :
						</label>
						<input
							onChange={handleChange}
							value={formdata.address}
							type="text"
							placeholder="Address"
							name="address"
							id="address"
							required
							className="w-full self-start bg-slate-500 border-2 border-slate-300 rounded-md py-1 px-2 placeholder:text-slate-300 outline-none focus:border-white"
						></input>
					</div>

					<div className="flex justify-around flex-col m-2">
						<label htmlFor="email" className="w-full">
							Email :
						</label>
						<input
							onChange={handleChange}
							value={formdata.email}
							type="text"
							placeholder="Email"
							name="email"
							id="email"
							required
							className="w-full self-start bg-slate-500 border-2 border-slate-300 rounded-md py-1 px-2 placeholder:text-slate-300 outline-none focus:border-white"
						></input>
					</div>
					<div className="flex justify-around flex-col m-2">
						<label htmlFor="phone" className="w-full">
							Phone No. :
						</label>
						<input
							onChange={handleChange}
							value={formdata.phone}
							type="text"
							placeholder="Phone"
							name="phone"
							id="phone"
							className="w-full self-start bg-slate-500 border-2 border-slate-300 rounded-md py-1 px-2 placeholder:text-slate-300 outline-none focus:border-white"
						></input>
					</div>

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

					<div className="flex justify-around flex-col m-2">
						<label htmlFor="repassword" className="w-full">
							Confirm Password :
						</label>
						<input
							onChange={handleChange}
							value={formdata.repassword}
							type="password"
							placeholder="Re-type Password"
							name="repassword"
							id="repassword"
							required
							className="w-full self-start bg-slate-500 border-2 border-slate-300 rounded-md py-1 px-2 placeholder:text-slate-300 outline-none focus:border-white"
						></input>
					</div>
				</div>

				<div className=" flex justify-center items-center self-start flex-col mt-4 mx-2 pb-4">
					<p className="font-semibold  text-2xl">Education</p>
				</div>
				<div className="flex flex-col justify-around p-2 border-b-2 mb-4">
					<div className="flex justify-around flex-col m-2">
						<label htmlFor="university" className="w-full">
							College/University :
						</label>
						<input
							onChange={handleChange}
							value={formdata.university}
							type="text"
							placeholder="College/University"
							name="university"
							required
							id="university"
							className="w-full self-start bg-slate-500 border-2 border-slate-300 rounded-md py-1 px-2 placeholder:text-slate-300 outline-none focus:border-white"
						></input>
					</div>

					<div className="flex flex-col justify-around m-2 flex-wrap">
						<div className="flex justify-between flex-wrap gap-4">
							<input
								onChange={handleChange}
								value={formdata.faculty}
								type="text"
								placeholder="Faculty"
								name="faculty"
								required
								id="faculty"
								className="bg-slate-500 border-2 border-slate-300 rounded-md py-1 px-2 placeholder:text-slate-300 outline-none focus:border-white"
							></input>
							<input
								onChange={handleChange}
								value={formdata.rollno}
								type="text"
								placeholder="Roll Number"
								name="rollno"
								id="rollno"
								required
								className="bg-slate-500 border-2 border-slate-300 rounded-md py-1 px-2 placeholder:text-slate-300 outline-none focus:border-white"
							></input>
						</div>
					</div>
					<div className="flex justify-around flex-col m-2">
						<label htmlFor="adminKey" className="w-full">
							Admin Key <span className="text-sm">(for registering as admin)</span> :
						</label>
						<input
							onChange={handleChange}
							value={formdata.adminKey}
							type="text"
							placeholder="Admin Key"
							name="adminKey"
							id="adminKey"
							className="w-full self-start bg-slate-500 border-2 border-slate-300 rounded-md py-1 px-2 placeholder:text-slate-300 outline-none focus:border-white"
						></input>
					</div>
				</div>

				<div className="flex justify-around m-2">
					<button
						type="submit"
						className="bg-white text-black font-mono p-2 rounded-md hover:bg-slate-700 hover:text-white "
					>
						Register as User
					</button>
					<button
						type="submit"
						className="bg-white text-black font-mono p-2 rounded-md hover:bg-slate-700 hover:text-white"
					>
						Register as Admin
					</button>
				</div>
			</form>
		</div>
	);
}

export default Form;
