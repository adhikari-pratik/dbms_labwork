import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ViewAll() {
	const navigate = useNavigate();
	const [userData, setUserData] = useState(null);
	const [edit, setEdit] = useState(false);

	const [error, setError] = useState(null);

	const URL = import.meta.env.VITE_API_URL;

	useEffect(() => {
		// if (userData) return; // Skip fetching if data already exists in localStorage

		const fetchUserData = async () => {
			try {
				// Try to get userData from localStorage on component mount
				const savedData = localStorage.getItem("username");
				console.log(savedData);

				const response = await fetch(
					`${URL}/viewall/${savedData}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				const result = await response.json();
				if (response.ok) {
					console.log("found userdata", result.data);
					setUserData(result.data);
					localStorage.setItem(
						"userData",
						JSON.stringify(result.data.username)
					); // Save data to localStorage
				} else {
					setError(result.error);
					throw new Error(result.message || "Failed to fetch user data");
				}
			} catch (error) {
				console.error("Problem in fetching the data.", error);
			}
		};

		fetchUserData();
	}, []);
	console.log(userData);
	if (error) {
		return <p>Error: {error}</p>;
	}

	if (!userData) {
		return <p>Loading user data...</p>;
	}

	const handleViewAll = () => {
		navigate("/all");
	};
	const handleEdit = () => {
		setEdit(!edit);
	};
	const handleDelete = () => {
		setEdit(!edit);
	};
	return (
		<div className="bg-slate-500 w-full h-auto flex justify-around m-4 p-12 flex-col gap-12 rounded-3xl focus:drop-shadow-2xl">
			<div className="text-white font-mono w-full">
				<div className="flex justify-between w-3/4">
					<p className="font-bold text-2xl">
						<input
							type="text"
							name="dataRole"
							id="dataRole"
							value="ROLE"
							className="outline-none bg-slate-500 "
						/>
					</p>
					<h2 className="mr-16">Name</h2>
					<p className="ml-8">Email</p>
					<p>Phone</p>
					<p>Address</p>
					<p>University</p>
					<p>Department</p>
					<p>Roll No. </p>
				</div>
				{userData.map((data, index) => {
					return (
						<div key={index} className="flex justify-center w-full">
                        <div className="flex justify-between w-3/4">

							<p className="font-bold text-2xl mb-2">
								<input
									type="text"
									name="dataRole"
									id="dataRole"
									value={data.role.toUpperCase()}
									className="outline-none bg-slate-500 "
								/>
							</p>
							<h2>{data.name}</h2>
							<p> {data.email}</p>
							<p> {data.phone}</p>
							<p> {data.address}</p>
							<p> {data.university}</p>
							<p> {data.department}</p>
							<p> {data.rollno}</p>
                        </div>

							<div className="flex justify-around w-1/4 m-4">
								<button
									className="bg-white text-black p-1 rounded-md hover:scale-105"
									onClick={handleEdit}
								>
									Edit
								</button>
								<button
									className="bg-white text-black p-1 rounded-md hover:scale-105"
									onClick={handleDelete}
								>
									Delete
								</button>
							</div>
						</div>
					);
				})}
			</div>
			<div className="self-center bg-white rounded-full w-32 h-32 flex justify-center items-center hover:cursor-pointer  hover:scale-110 hover:shadow-sm hover:shadow-white">
				<p className="text-xl font-mono" onClick={handleViewAll}>
					View All{" "}
				</p>
			</div>
		</div>
	);
}

export default ViewAll;
