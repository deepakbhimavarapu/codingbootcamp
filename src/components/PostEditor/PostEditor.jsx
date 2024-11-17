import { useState } from 'react';
import './PostEditor.css';
import TagInput from '../TagInput/TagInput';
import RichTextEditor from '../RichTextEditor/RichTextEditor';

function PostEditor({ addPost }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: [],
    category: 'general',
  });

  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'title':
        return value.trim().length < 5 ? 'Title must be at least 5 characters' : '';
      case 'content':
        return value.trim().length < 100 ? 'Content must be at least 100 characters' : '';
      case 'tags':
        return value.length === 0 ? 'At least one tag is required' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setIsDirty((prev) => ({
      ...prev,
      [name]: true,
    }));

    if (isDirty[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Form is valid, create new post
      const newPost = {
        ...formData,
        timestamp: new Date().toISOString(),
        isPublished: true, // Always mark as published
      };

      // Add the new post using the addPost function from App.jsx
      addPost(newPost);

      // Show confirmation alert
      alert('Post published successfully!');

      // Reset the form
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      tags: [],
      category: 'general',
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="post-editor">
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="content">Content *</label>
        <RichTextEditor
          value={formData.content}
          onChange={(value) => handleChange({ target: { name: 'content', value } })}
          error={errors.content}
        />
        {errors.content && <span className="error-message">{errors.content}</span>}
      </div>

      <TagInput
        tags={formData.tags}
        onChange={(tags) => handleChange({ target: { name: 'tags', value: tags } })}
        onBlur={() => handleBlur({ target: { name: 'tags', value: formData.tags } })}
        error={errors.tags}
      />

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="general">General</option>
          <option value="technology">Technology</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="travel">Travel</option>
        </select>
      </div>

      <button type="submit" className="submit-button">
        Publish Post
      </button>
    </form>
  );
}

export default PostEditor;
