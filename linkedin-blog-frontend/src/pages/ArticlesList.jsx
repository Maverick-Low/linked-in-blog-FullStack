import React from 'react'
import articles from './article-content'
import ArticlesListComponent from '../components/ArticlesListComponent';


const ArticlesList = () => {

    return (
		<ArticlesListComponent articles = {articles} />
    );
}

export default ArticlesList
