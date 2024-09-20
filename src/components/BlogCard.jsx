import { Link } from 'react-router-dom';
import {decode} from 'he';
import PropTypes from 'prop-types';

const BlogCard = ({ id, title, date, summary, featuredImage }) => {
	return (
		<Link to={`/post/${id}`} className="blog-post" aria-label={`Read more about ${title}`}>
			{/* Featured Image */}
			{featuredImage && <img src={featuredImage} alt={title} className="featured-image" />}
			<p className="blog-date">
				{new Date(date).toLocaleDateString(
					"en-US",
					{
						day: "numeric",
						month: "long",
						year: "numeric",
					}
				)}
			</p>
			<h2 className="blog-title">{decode(title)}</h2>
			<div dangerouslySetInnerHTML={{ __html: summary }}></div>
		</Link>
	);
};

export default BlogCard;

BlogCard.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	summary: PropTypes.string.isRequired,
	featuredImage: PropTypes.string.isRequired,
}
