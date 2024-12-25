import Header from "./Header";
import Footer from "./Footer";
import Form from "./Form";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import { useState } from "react";
import ViewAll from "./ViewAll";

function App() {
	const [username, setUsername] = useState("");
	return (
		<>
			{/* <div className="flex  justify-between flex-col flex-grow ">
						<div className="flex justify-center m-8 p-4"> */}
				{/* <Header></Header> */}
				<Router>
					<Routes>
							<Route path="/" element={<Layout />}>
								<Route index element={<Form />} /> {/* Default page */}
								<Route path="Login" element={<Login setUsername={setUsername}/>} />
								<Route path="/home" element={<Home username = {username}/>} />
								<Route path="/all" element={<ViewAll username = {username}/>} />
							</Route>
					</Routes>
				</Router>
				{/* <Footer></Footer> */}
						{/* </div>
			</div> */}
		</>
	);
}

export default App;
