import React, { useState } from "react";
import { FaImage, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { createPost } from "../api/posts";
import "./CreatePost.css";

export default function CreatePost({ onAddPost }) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MAX_CHARS = 2000;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const postData = {
        content: content.trim(),
        author: {
          name: "User",
          image: "https://via.placeholder.com/40",
          profession: "Gamer"
        },
        createdAt: new Date().toISOString()
      };

      const newPost = await createPost(postData);
      onAddPost(newPost);
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
          <div className="user-avatar">
            
          </div>
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
            <button type="button" className="action-button" title="Add Photo">
              <FaImage />
              <span>Photo</span>
            </button>
            <button type="button" className="action-button" title="Add Event">
              <FaCalendarAlt />
              <span>Event</span>
            </button>
            <button type="button" className="action-button" title="Add Location">
              <FaMapMarkerAlt />
              <span>Location</span>
            </button>
  
          </div>
          <button
            type="submit"
            className={`post-button ${isSubmitting ? "loading" : ""}`}
            disabled={!content.trim() || isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
