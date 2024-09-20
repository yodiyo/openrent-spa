import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { decode } from 'he';
import PropTypes from 'prop-types';

function Page({ id }) {

	const [page, setPage] = useState(null);
	const url = "https://blog.openrent.co.uk/wp-json/wp/v2/pages/" + id;

	useEffect(() => {
		const fetchPage = async () => {
			try {
				const response = await fetch(url);
				const result = await response.json();
				setPage(result);
			} catch (error) {
				console.error('error fetching data: ', error);
				setPage(null);
			}

		};
		fetchPage();
	}, [url]);

	if (page === null) {
		return <div className="hero"><p>Loading...</p></div>
	}

	return (
		<header className="hero">
			<div className="hero-content">
				<h1>{decode(page.title.rendered)}</h1>
				<p
					className=""
					dangerouslySetInnerHTML={{ __html: page.content.rendered }}
				/>
				<Link to="/blog" className="btn btn-primary" aria-label="News and guides">News & Guides</Link>
			</div>
		</header >
	)
}

export default Page;

Page.propTypes = {
	id: PropTypes.string
}
