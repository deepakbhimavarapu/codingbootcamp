import { useState } from 'react';
import Header from './components/Header';
import BlogList from './components/BlogList/BlogList';
import PostEditor from './components/PostEditor/PostEditor';
import { posts as initialPosts } from './data/posts'; // Renaming to avoid confusion
import './App.css';

function App() {
  const [allPosts, setAllPosts] = useState(initialPosts); // Initialize with the posts from data/posts

  const addPost = (newPost) => {
    setAllPosts((prevPosts) => [...prevPosts, newPost]); // Add new post to the state
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <BlogList posts={allPosts} />
        <h1>Post Editor</h1>
        <PostEditor addPost={addPost} />
      </main>
    </div>
  );
}

export default App;
