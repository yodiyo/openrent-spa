import { useState, useEffect } from 'react';

const useFetchPost = () => {
	const [posts, setPosts] = useState([]);
	const [post, setPost] = useState(null);

	const checkMedia = async (postData) => {
		const mediaResponse = await fetch(`https://blog.openrent.co.uk/wp-json/wp/v2/media/${postData.featured_media}`);
		const mediaData = await mediaResponse.json();
		const ImgFeatured = mediaData.source_url;
		const ImgThumb = mediaData.media_details.sizes.large.source_url; // Lower resolution image for index page, using large img @ 1024px x 509px to still look good on mobile.
		return { ...postData, featured_image: ImgFeatured, medium_image: ImgThumb }; // Add the featured image URL to the post
	}

	const fetchPost = async (id) => {
		if (id === 'undefined') {
			return
		};
		try {
			const response = await fetch(`https://blog.openrent.co.uk/wp-json/wp/v2/posts/${id}`);
			const post = await response.json();
			if (post) {
				// Check if the post has an image
				const postsWithImage =
					post.featured_media ? await checkMedia(post) : { ...post, featured_image: null }
					;
				setPost(postsWithImage);
			} else {
				console.error('No data found for post id:', id);
			}
		} catch (error) {
			console.error('Error fetching data: ', error);
		}
	}

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch('https://blog.openrent.co.uk/wp-json/wp/v2/posts?per_page=25');
				const postData = await response.json();

				const postsWithImages = await Promise.all(
					postData.map(async (post) => {
						if (post.featured_media) {
							return checkMedia(post);
						} else {
							return { ...post, featured_image: null }; // No featured image
						}
					})
				);

				setPosts(postsWithImages);
			} catch (error) {
				console.error('Error fetching posts: ', error);
			}
		}

		fetchPosts();
	}, []);
	return { posts, post, fetchPost };
};

export default useFetchPost;
