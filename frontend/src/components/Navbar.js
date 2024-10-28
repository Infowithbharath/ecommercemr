import React, { useState, useEffect, useRef, useContext } from "react";
import { FaShoppingCart, FaEnvelope, FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "./[removal.ai]_8bff5fd0-35f6-46d5-a414-e7e5172e39e4-mrijyo_logo1.png";
import categoryService from "../services/categoryService";
import subcategoryService from "../services/subcategoryService";
import { SubcategoryContext } from "../components/SubcategoryContext";

const Navbar = () => {
	const [categories, setCategories] = useState([]);
	const [subcategories, setSubcategories] = useState({});
	const [activeCategory, setActiveCategory] = useState(null);
	const [showCategories, setShowCategories] = useState(false);
	const navbarRef = useRef(null);
	const navigate = useNavigate();

	const { setSelectedSubcategory } = useContext(SubcategoryContext);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await categoryService.getCategories();
				setCategories(response.data || []);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		fetchCategories();

		const handleClickOutside = (event) => {
			if (navbarRef.current && !navbarRef.current.contains(event.target)) {
				setShowCategories(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleCategoryHover = async (categoryId) => {
		setActiveCategory(categoryId);
		if (!subcategories[categoryId]) {
			try {
				const response = await subcategoryService.getSubcategories(categoryId);
				setSubcategories((prev) => ({
					...prev,
					[categoryId]: response.data || [],
				}));
			} catch (error) {
				console.error("Error fetching subcategories:", error);
			}
		}
	};

	const handleSubcategoryClick = (subcategoryId) => {
		setSelectedSubcategory(subcategoryId);
		setShowCategories(false);
	};

	return (
		<nav className="navbar" ref={navbarRef}>
			<div className="navbar-container">
				<div
					className="menu-icon"
					onClick={() => setShowCategories(!showCategories)}>
					<FaBars />
				</div>
				<div className="logo-container">
					<Link to="/">
						<img src={logo} alt="Logo" className="navbar-logo-image" />
					</Link>
				</div>
				{/* Centered text instead of search box */}
				<div className="collection-text">MriJyo'z Collections</div>
				<div className="navbar-right">
					<Link to="/cart" className="nav-link cart-button">
						<FaShoppingCart /> Cart
					</Link>
					<Link to="/contact" className="nav-link contact-button">
						<FaEnvelope /> Contact Info
					</Link>
				</div>
			</div>
			{showCategories && (
				<div className="category-menu">
					<ul>
						{categories.map((category) => (
							<li
								key={category._id}
								onMouseEnter={() => handleCategoryHover(category._id)}>
								{category.name}
								{activeCategory === category._id &&
									subcategories[category._id] && (
										<ul className="subcategory-menu">
											{subcategories[category._id].map((subcategory) => (
												<li
													key={subcategory._id}
													onClick={() =>
														handleSubcategoryClick(subcategory._id)
													}>
													{subcategory.name}
												</li>
											))}
										</ul>
									)}
							</li>
						))}
					</ul>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
