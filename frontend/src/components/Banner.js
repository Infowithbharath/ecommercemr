// src/components/Banner.js
import React, { useRef } from "react";
import "./Banner.css";

const Banner = () => {
	// Reference to the section to scroll to
	const scrollToSection = useRef(null);

	// Scroll function
	const handleScroll = () => {
		scrollToSection.current.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<>
			<div className="banner">
				<div className="banner-content">
					<p className="banner-title">Feel the Tradition</p>
					<p className="banner-subtitle">MRIJYO'Z COLLECTIONS</p>
					<button className="banner-button" onClick={handleScroll}>
						Shop Now
					</button>
				</div>
			</div>

			{/* Section to scroll to */}
			<div ref={scrollToSection} className="products-section">
				{/* Your products section or other content */}
				{/* Add your product cards or other content here */}
			</div>
		</>
	);
};

export default Banner;
