import React from "react";

import SecondsCounter from "./contador";
//include images into your bundle

//create your first component
const Home = () => {
	return (
		<div className="container d-flex flex-column align-items-center mt-5">
            {/* Renderizamos el contador */}
			<SecondsCounter />
		</div>
	);
};

export default Home;