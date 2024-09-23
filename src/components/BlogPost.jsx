import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchPost from './useFetchPost';

const BlogPost = () => {
	const { id: postId } = useParams();  // Get the post ID from the URL
	const { post, fetchPost } = useFetchPost();
  	const [isLoading, setIsLoading] = useState(false);

	// Fetch the post by its ID
	useEffect(() => {
		if (postId && ! post) {
			const fetchData = async () => {
				setIsLoading(true);
				try {
					await fetchPost(postId);
				} catch (error) {
					console.error('Error fetching data: ', error);
				} finally {
					setIsLoading(false);
				}
			};
			fetchData();
		}
	}, [postId, fetchPost, post]);

	if (isLoading) {
		return <div className="post"><p>Loading...</p></div>;
	}

	if (!post || !post.id) {
		return <div className="post"><p>Post not found</p></div>;
	}

	return (
		<div id={`post-${post.id}`} className="post" role="main">
			{/* Display the featured image */}
			{post.featured_image && <img src={post.featured_image} alt={post.title?.rendered} className="featured-image" loading="lazy" />}
			<article className="post-content">
				<h1>{post.title?.rendered}</h1>
				<div dangerouslySetInnerHTML={{ __html: post.content?.rendered }}></div>
				<small>Published on {post.date ? new Date(post.date).toLocaleDateString() : ''}</small>
			</article>
		</div>
	);
};

export default BlogPost;
