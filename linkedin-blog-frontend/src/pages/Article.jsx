import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import articles from './article-content';
import NotFound from './NotFound';
import CommentsList from '../components/CommentsList';
import axios from 'axios';

const Article = () => {

	const [articleInfo, setArticleInfo] = useState({upvotes: 0, comments: []}); 
	const { articleId } = useParams(); // Gets the article id from the url parameter

	// Set article Info to have the upvotes and comments retrieved from the database
	useEffect( () => {
		const loadArticleInfo = async() => {
			const response = await axios.get(`/api/articles/${articleId}`);
			const articleInfoDB = response.data;
			setArticleInfo(articleInfoDB);
		} 
		
		loadArticleInfo();
	}, []);

	const updateUpvotes = async() => {
		await axios.put(`/api/articles/${articleId}/upvote`, {upvotes: articleInfo.upvotes + 1});
		setArticleInfo( prevState => (
			{...prevState, upvotes: prevState.upvotes + 1}
		));
	}

	const article = articles.find(article => article.name === articleId);

	if(!article) {
		return <NotFound />
	}

	return (
		<> 
			<h1> {article.title} </h1>
			<div className="upvotes-section">
				<p> This article has {articleInfo.upvotes} upvotes </p>
				<button onClick = {updateUpvotes}> Upvote me! </button>
			</div>
			{article.content.map( (paragraph,i) => (
				<p key={i}> {paragraph} </p>
			))}
			<CommentsList comments = {articleInfo.comments}/>
		</>
	);	
}

export default Article
