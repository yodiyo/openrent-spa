import { Link } from 'react-router-dom';
import {decode} from 'he';
import PropTypes from 'prop-types';

const BlogCard = ({ id, title, date, summary, mediumLargeImage, mediumImage, largeImage }) => {
	return (
		<Link to={`/post/${id}`} className="blog-post" aria-label={`Read more about ${title}`}>
			{(mediumLargeImage || mediumImage || largeImage)
			&& <img
				src={mediumImage}
				srcSet={`
					${mediumImage} 524w,
					${mediumLargeImage} 768w,
					${largeImage} 1024w
				`}
				sizes="
					100vw
					(min-width: 583px) 50vw,
					(min-width: 866px) 33vw,
					(min-width: 1024px) 25vw
				"
				alt={title}
				className="index-image"
				loading="lazy"
			/>}
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
	mediumLargeImage: PropTypes.string.isRequired,
	mediumImage: PropTypes.string.isRequired,
	largeImage: PropTypes.string.isRequired,
}
