import React from 'react';
import { Routes, Route} from "react-router-dom";

// Element
import {Search, Home, Deskripsi} from "../../pages";
// Component

const Routess = () => {
	return (
		<>
				<Routes>
					<Route path="/search" element={<Search />}/>
                    <Route path="/deskripsi/:id" element={<Deskripsi />} />
					<Route path="/" element={<Home />}/>
					
				</Routes>
		</>
	)
}

export default Routess