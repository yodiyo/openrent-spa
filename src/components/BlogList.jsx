import BlogCard from './BlogCard';
import PropTypes from 'prop-types';

const BlogList = ({ posts }) => {

	if (posts.length === 0) {
		return <div className="posts-container"><p>No posts found.</p></div>;
	}

	return (
		<div className="posts-container">
			{posts && posts.map((post) => (
				<BlogCard
					key={post.id}
					id={post.id}
					title={post.title.rendered}
					date={post.date}
					summary={post.excerpt.rendered}
					featuredImage={post.featured_image}
					content={post.content.rendered}
				/>
			))}
		</div>
	);
};

export default BlogList;

BlogList.propTypes = {
	posts: PropTypes.arrayOf(PropTypes.object).isRequired,
}
