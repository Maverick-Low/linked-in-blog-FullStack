import React from 'react'
import { useParams } from 'react-router-dom'
import articles from './article-content';
import NotFound from './NotFound';

const Article = () => {
	const { articleId } = useParams();
	const article = articles.find(article => article.name === articleId);

	if(!article) {
		return <NotFound />
	}

	return (
		<> 
			<h1> {article.title} </h1>
			{article.content.map( (paragraph,i) => (
				<p key={i}> {paragraph} </p>
			)
			)}
		</>
	);	
}

export default Article
