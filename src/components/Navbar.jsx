import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Logo from "../logo.svg?react";
import Menu from "../icon-menu.svg?react";
import Close from "../icon-close.svg?react";

import { decode } from 'he';
import PropTypes from 'prop-types';

function Navbar({ categories }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const isMobile = useMediaQuery({ maxWidth: "1023px" });
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	const closeMenuOnMobile = () => {
		if (isMobile) {
			setIsMenuOpen(false);
		}
	};

	const renderNavLinks = () => {
		const listClassName = isMobile ? "nav__list_mobile" : "nav__list";
		return (
			<ul className={`primary-nav ${listClassName}`}>
				<li>
					<NavLink to="/blog" onClick={closeMenuOnMobile} aria-expanded="false" aria-controls="sub-menu">News and Guides</NavLink>
					<ul id="sub-menu" className="sub-menu">
						{categories && categories.map((category) => (
							<li key={category.id}>
								<NavLink
									to={`/blog?category=${category.id}`}
									onClick={closeMenuOnMobile}
									role="link"
								>
									{decode(category.name)}
								</NavLink>
							</li>
						))}
					</ul>
				</li>
				<li>
					<NavLink to="/subscribe" onClick={closeMenuOnMobile} role="link">Subscribe</NavLink>
				</li>
				<li className="btn-default">
					<NavLink to="https://openrent.co.uk" onClick={closeMenuOnMobile}role="link">Visit OpenRent</NavLink>
				</li>
			</ul>
		)
	}

	return (
		<div className="nav-container" role="navigation" aria-label="main navigation">
			<nav className="header-nav">
				<div className="logo">
					<NavLink to="/" ><Logo className="openrent-logo svg-logo" role="Link" /></NavLink>
				</div>
				{isMobile && (
					<div className="nav__toggle" id="nav-toggle" onClick={toggleMenu} role="button">
						<Menu />
					</div>
				)}
				{isMobile ? (
					<div
						className={`nav__menu  ${isMenuOpen ? "show-menu" : ""}`}
						id="nav-menu"
					>
						{renderNavLinks()}
						<div className="nav__close" id="nav-close" onClick={toggleMenu} role="button">
							<Close />
						</div>
					</div>
				) : (
					renderNavLinks()
				)}
			</nav>
		</div>
	);
}

export default Navbar;

Navbar.propTypes = {
	categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};
