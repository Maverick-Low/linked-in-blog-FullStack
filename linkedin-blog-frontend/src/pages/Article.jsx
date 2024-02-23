import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import articles from './article-content';
import NotFound from './NotFound';
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm';
import useUser from '../hooks/useUser';

const Article = () => {

	const [articleInfo, setArticleInfo] = useState({upvotes: 0, comments: [], canUpvote: true});
    const {canUpvote} = articleInfo;
	const { articleId } = useParams(); // Gets the article id from the url parameter
	const {user , isLoading} = useUser();

	// Set article Info to have the upvotes and comments retrieved from the database
	useEffect( () => {
		const loadArticleInfo = async() => {
            const token = user && await user.getIdToken();
            const headers = token ? {authtoken: token} : {};
			const response = await axios.get(`/api/articles/${articleId}`, {headers});
			const articleInfoDB = response.data;
			setArticleInfo(articleInfoDB);
            return articleInfoDB;
		} 
		if(!isLoading){ 
            const lol = loadArticleInfo();
            
            console.log("LOADEDINFO:", lol);
        }
	
        
	}, [isLoading, user]);

	const updateUpvotes = async() => {
        const token = user && await user.getIdToken();
        const headers = token ? {authtoken: token} : {};
		const response = await axios.put(`/api/articles/${articleId}/upvote`, null, {
            headers: headers,
        });
        const updatedArticle = response.data;
		setArticleInfo(updatedArticle);
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
                <div> {canUpvote} </div>
				{user
					? <button onClick = {updateUpvotes}> {canUpvote ? "Upvote me!" : "Already Upvoted"} </button>
					: <button onClick = { () => {console.log('Redirect to login');} }> Login to upvote </button>
				}
				
			</div>
			{article.content.map( (paragraph,i) => (
				<p key={i}> {paragraph} </p>
			))}
			{user
				? <AddCommentForm
				articleName={articleId}
				onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)}/>
				: <button onClick = { () => {console.log('Redirect to login');} }> Login to add a comment </button> 
			}
		
			<CommentsList comments = {articleInfo.comments}/>
		</>
	);	
}

export default Article
