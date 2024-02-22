import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import NavBar from './NavBar';
import Home from './pages/Home';
import ArticlesList from './pages/ArticlesList';
import Article from './pages/Article';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';

function App() {
  return (
    <BrowserRouter> 
		<div className="App">
			<NavBar/>
			<div id = "page-body"> 
				<Routes>
					<Route path = "/" element = {<Home />} />
					<Route path = "/about" element = {<About />} />
					<Route path = "/articles" element = {<ArticlesList />} />
					<Route path = "/articles/:articleId" element = {<Article />} />
					<Route path = "/login" element = {<LoginPage />} />
					<Route path = "/create-account" element = {<CreateAccountPage />} />
					<Route path = "*" element = {<NotFound />} />
				</Routes>
			</div>
		</div>
    </BrowserRouter>
   
  );
}

export default App;
