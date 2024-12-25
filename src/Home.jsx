import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ username }) => {
	const navigate = useNavigate();
    const [userData, setUserData] = useState(() => {
        // Try to get userData from localStorage on component mount
        const savedData = localStorage.getItem("userData");
        return savedData ? JSON.parse(savedData) : null;
    });

    const [error, setError] = useState(null);

    useEffect(() => {
        if (userData) return; // Skip fetching if data already exists in localStorage

        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user/${username}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const result = await response.json();
                if (response.ok) {

					console.log("found userdata", result)
                    setUserData(result.data);
                    localStorage.setItem("userData", JSON.stringify(result.data)); // Save data to localStorage
                } else {
                    throw new Error(result.message || "Failed to fetch user data");
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUserData();
    }, [username, userData]);

	
    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!userData) {
        return <p>Loading user data...</p>;
    }

	const handleViewAll = ()=>{
		navigate('/all')
	}

    return (
        <div className="bg-slate-500 w-1/2 h-auto flex justify-around m-4 p-12 flex-col gap-12 rounded-3xl focus:drop-shadow-2xl">
			<div className="text-white font-mono w-full">
				
					<div>
                        <h1 className="font-bold text-2xl mb-2">{(userData.role).toUpperCase()}</h1>
						<h2>Name: {userData.name}</h2>
						<p>Email: {userData.email}</p>
						<p>Phone: {userData.phone}</p>
						<p>Address: {userData.address}</p>
						<p>University: {userData.university}</p>
						<p>Department: {userData.department}</p>
						<p>Roll No. : {userData.rollno}</p>
                        

					</div>
				
			</div>
			<div className="self-center bg-white rounded-full w-32 h-32 flex justify-center items-center hover:cursor-pointer  hover:scale-110 hover:shadow-sm hover:shadow-white">
				<p className="text-xl font-mono" onClick={handleViewAll}>
					View All{" "}
				</p>
			</div>
		</div>
    );
};

export default Home;




