import React, { useState } from "react";
import { FaImage, FaCalendarAlt, FaMapMarkerAlt,} from "react-icons/fa";
import { createPost } from "../api/posts";
import "./CreatePost.css";

export default function CreatePost({ onAddPost }) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MAX_CHARS = 2000;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const postData = {
        content,
        name: "Temporary User",
        profileImage: "https://via.placeholder.com/40",
        profession: "Gamer"
      };

      const newPost = await createPost(postData);
      onAddPost(newPost);
      
      // Reset form
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-post">
      <h3 className="create-post-title">Create a Post</h3>
      <form onSubmit={handleSubmit}>
        <div className="post-input-wrapper">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="post-input"
            maxLength={MAX_CHARS}
          />
          <div className="char-count">
            {content.length}/{MAX_CHARS}
          </div>
        </div>

        <div className="post-actions">
          <div className="action-buttons">
            <button type="button" className="action-button" disabled>
              <FaImage />
              <span>Photo</span>
            </button>
            <button type="button" className="action-button" disabled>
              <FaCalendarAlt />
              <span>Event</span>
            </button>
            <button type="button" className="action-button" disabled>
              <FaMapMarkerAlt />
              <span>Location</span>
            </button>
          </div>
          <button
            type="submit"
            disabled={!content.trim() || isSubmitting}
            className={`post-button ${isSubmitting ? 'loading' : ''}`}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
