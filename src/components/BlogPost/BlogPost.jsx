import PropTypes from 'prop-types';
import './BlogPost.css';

function BlogPost({ title, content, author, date, readTime }) {
  return (
    <article className="blog-post">
      <div className="blog-post__header">
        <h2 className="blog-post__title">{title}</h2>
        <div className="blog-post__meta">
          <span className="blog-post__author">By {author}</span>
          <time className="blog-post__date">{date}</time>
          <span className="blog-post__read-time">{readTime} min read</span>
        </div>
      </div>
      
      <div className="blog-post__content">
        {content}
      </div>
    </article>
  );
}

BlogPost.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  readTime: PropTypes.number.isRequired
};

export default BlogPost;