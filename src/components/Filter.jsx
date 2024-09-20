import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { decode } from 'he';
import PropTypes from 'prop-types';

const Filter = ({ categories }) => {
	const navigate = useNavigate();
	const location = useLocation();
	// const searchParams = new URLSearchParams(location.search);
	const urlParamCategory = new URLSearchParams(location.search).get('category');
	const [selectedCategoryId, setSelectedCategoryId] = useState(urlParamCategory || null);
	const prevSearchRef = useRef(location.search);

	useEffect(() => {
		if (prevSearchRef.current !== location.search) {
			const newUrlParamCategory = new URLSearchParams(location.search).get('category');
			if (newUrlParamCategory !== selectedCategoryId) {
			  setSelectedCategoryId(newUrlParamCategory || null);
			}
		}
	}, [selectedCategoryId, location.search]);

	const handleCategoryClick = (categoryId) => {
		setSelectedCategoryId(categoryId);
		navigate(`/blog${categoryId ? `?category=${categoryId}` : ''}`);
	}
	return (
		<div className="filter-container">
			<button onClick={() => handleCategoryClick(null)} className={! selectedCategoryId ? 'active' : ''}>
				All categories
			</button>
			{categories?.map((category) => (
				<button
					key={category.id}
					onClick={() => handleCategoryClick(category.id)}
					className={category.id === parseInt(selectedCategoryId) ? 'active' : ''}
				>
					{decode(category.name)}
				</button>
			))}
		</div>
	);
};

export default Filter;

Filter.propTypes = {
	categories: PropTypes.array
}
