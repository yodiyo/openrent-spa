import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlogPage from './components/BlogPage';
import BlogPost from './components/BlogPost';
import Page from './components/Page';

function App() {
	const [categories, setCategories] = useState([]);

	// Fetch categories from WordPress API
	const fetchCategories = async () => {
		try {
			const response = await fetch('https://blog.openrent.co.uk/wp-json/wp/v2/categories');
			const data = await response.json();

			if (data === null) {
				throw new Error('Null data response while fetching categories.');
			}

			// Filter categories to only include those with posts
			const filteredCategories = data.filter((category) => category.count > 0);

			if (filteredCategories === null || filteredCategories.length === 0) {
				throw new Error('No categories found.');
			}

			setCategories(filteredCategories);
		} catch (error) {
			console.error('Error fetching categories:', error);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);


	return (
		<Router>
			<div className="global-container">
				<div className="global-content">
					<Navbar categories={categories}/>
					<Routes>
						<Route path="/" element={<Page id={"1058"} />} />
						{/* Index page for regular posts */}
						<Route path="/blog" element={<BlogPage categories={categories} />} />
						{/* Dynamic route for individual blog posts */}
						<Route path="/post/:id" element={<BlogPost />} forceRefresh />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
