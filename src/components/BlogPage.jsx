import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BlogList from './BlogList';
import Filter from './Filter';
import useFetchPost from './useFetchPost';
import PropTypes from 'prop-types';

const BlogPage = ({ categories }) => {
	const { posts } = useFetchPost();
	const [filteredPosts, setFilteredPosts] = useState(null);
	const [loading, setLoading] = useState(true); // Loading state to manage rendering
	const [searchTerm, setSearchTerm] = useState(''); // State to hold the search input
	const location = useLocation();

	// Effect to filter posts based on selected category and search query
	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const categoryId = searchParams.get('category');

		// Filter by category and search term
		let filtered = posts;

		if (filtered.length > 0) {
			setLoading(true); // Set loading to true while filtering
			if (categoryId) {
				// Filter by category
				filtered = filtered.filter((post) =>
					post.categories.includes(parseInt(categoryId))
				);
			}

			if (searchTerm) {
				filtered = filtered.filter(
					(post) =>
						post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase())
						|| post.content.rendered.toLowerCase().includes(searchTerm.toLowerCase())
				);
			}
			setFilteredPosts(filtered);
			setLoading(false); // Turn off loading once filtering is done
		}
	}, [location.search, searchTerm, posts]);

	// Search input change handler
	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value); // Update search term when input changes
	};

	if (loading) {
		return <div className="posts-container">Loading posts...</div>; // Add a loading state for better UX
	}

	return (
		<>
			<div id="blog-index" className="blog-page">
				<div className="filters">

					<form role="search">
						{/* Search input */}
						<input
							name="search"
							className="filter-search-bar"
							type="text"
							value={searchTerm}
							onChange={handleSearchChange}
							placeholder="Search posts..."
						/>
					</form>
					{/* Filter component */}
					<Filter categories={categories} />
				</div>
				{/* Blog List Component */}
				{filteredPosts && <BlogList posts={filteredPosts} />}
			</div>
		</>
	);
};

export default BlogPage;

BlogPage.propTypes = {
	categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};
