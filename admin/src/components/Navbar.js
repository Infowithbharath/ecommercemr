import React from "react";
import { Link } from "react-router-dom";
import { FaListAlt, FaTags, FaBoxOpen, FaShapes } from "react-icons/fa"; // Import icons

const Navbar = () => {
	return (
		<nav className="navbar">
			<ul>
				<li>
					<Link to="/">
						<FaListAlt className="icon" /> Categories
					</Link>
				</li>
				<li>
					<Link to="/subcategories">
						<FaTags className="icon" /> Subcategories
					</Link>
				</li>
				<li>
					<Link to="/product-types">
						<FaShapes className="icon" /> Product Types
					</Link>
				</li>
				<li>
					<Link to="/products">
						<FaBoxOpen className="icon" /> Products
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
