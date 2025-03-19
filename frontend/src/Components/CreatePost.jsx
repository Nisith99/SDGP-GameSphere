import React, { useState } from "react";
import { FaImage, FaCalendarAlt, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { createPost } from "../api/posts";
import "./CreatePost.css";

export default function CreatePost({ onAddPost }) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMediaInput, setShowMediaInput] = useState(false);
  const [showEventInput, setShowEventInput] = useState(false);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const MAX_CHARS = 2000;

  const [media, setMedia] = useState({
    type: "image",
    url: "",
    caption: ""
  });

  const [event, setEvent] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: ""
  });

  const [location, setLocation] = useState({
    name: ""
  });

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

      // Add media if present
      if (showMediaInput && media.url) {
        postData.media = media;
      }

      // Add event if present
      if (showEventInput && event.title) {
        postData.event = {
          ...event,
          startDate: new Date(event.startDate),
          endDate: new Date(event.endDate)
        };
      }

      // Add location if present
      if (showLocationInput && location.name) {
        postData.location = {
          ...location
        };
      }

      const newPost = await createPost(postData);
      onAddPost(newPost);
      
      // Reset form
      setContent("");
      setMedia({ type: "image", url: "", caption: "" });
      setEvent({ title: "", description: "", startDate: "", endDate: "", location: "" });
      setLocation({ name: ""});
      setShowMediaInput(false);
      setShowEventInput(false);
      setShowLocationInput(false);
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

        {/* Media Input */}
        {showMediaInput && (
          <div className="additional-input media-input">
            <div className="input-header">
              <h4>Add Media</h4>
              <button type="button" onClick={() => setShowMediaInput(false)} className="close-button">
                <FaTimes />
              </button>
            </div>
            <select
              value={media.type}
              onChange={(e) => setMedia({ ...media, type: e.target.value })}
              className="select-input"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
            <input
              type="url"
              value={media.url}
              onChange={(e) => setMedia({ ...media, url: e.target.value })}
              placeholder="Enter media URL"
              className="text-input"
            />
            <input
              type="text"
              value={media.caption}
              onChange={(e) => setMedia({ ...media, caption: e.target.value })}
              placeholder="Add a caption"
              className="text-input"
            />
          </div>
        )}

        {/* Event Input */}
        {showEventInput && (
          <div className="additional-input event-input">
            <div className="input-header">
              <h4>Add Event</h4>
              <button type="button" onClick={() => setShowEventInput(false)} className="close-button">
                <FaTimes />
              </button>
            </div>
            <input
              type="text"
              value={event.title}
              onChange={(e) => setEvent({ ...event, title: e.target.value })}
              placeholder="Event title"
              className="text-input"
            />
            <textarea
              value={event.description}
              onChange={(e) => setEvent({ ...event, description: e.target.value })}
              placeholder="Event description"
              className="text-input"
            />
            <div className="date-inputs">
              <input
                type="datetime-local"
                value={event.startDate}
                onChange={(e) => setEvent({ ...event, startDate: e.target.value })}
                className="date-input"
              />
              <input
                type="datetime-local"
                value={event.endDate}
                onChange={(e) => setEvent({ ...event, endDate: e.target.value })}
                className="date-input"
              />
            </div>
            <input
              type="text"
              value={event.location}
              onChange={(e) => setEvent({ ...event, location: e.target.value })}
              placeholder="Event location"
              className="text-input"
            />
          </div>
        )}

        {/* Location Input */}
        {showLocationInput && (
          <div className="additional-input location-input">
            <div className="input-header">
              <h4>Add Location</h4>
              <button type="button" onClick={() => setShowLocationInput(false)} className="close-button">
                <FaTimes />
              </button>
            </div>
            <input
              type="text"
              value={location.name}
              onChange={(e) => setLocation({ ...location, name: e.target.value })}
              placeholder="Location name"
              className="text-input"
            />
            </div>          
        )}

        <div className="post-actions">
          <div className="action-buttons">
            <button 
              type="button" 
              className={`action-button ${showMediaInput ? 'active' : ''}`}
              onClick={() => {
                setShowMediaInput(!showMediaInput);
                setShowEventInput(false);
                setShowLocationInput(false);
              }}
              title="Add Photo"
            >
              <FaImage />
              <span>Photo</span>
            </button>
            <button 
              type="button" 
              className={`action-button ${showEventInput ? 'active' : ''}`}
              onClick={() => {
                setShowEventInput(!showEventInput);
                setShowMediaInput(false);
                setShowLocationInput(false);
              }}
              title="Add Event"
            >
              <FaCalendarAlt />
              <span>Event</span>
            </button>
            <button 
              type="button" 
              className={`action-button ${showLocationInput ? 'active' : ''}`}
              onClick={() => {
                setShowLocationInput(!showLocationInput);
                setShowEventInput(false);
                setShowMediaInput(false);
              }}
              title="Add Location"
            >
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
