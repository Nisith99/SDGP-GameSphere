import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Image, Loader } from "lucide-react";

const PostCreation = ({ user }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const queryClient = useQueryClient();

  const { mutate: createPostMutation, isPending } = useMutation({
    mutationFn: async (postData) => {
      const res = await axiosInstance.post("/posts/create", postData, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    },
    onSuccess: () => {
      resetForm();
      toast.success("Post created successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Failed to create post");
    },
  });

  const handlePostCreation = async () => {
    try {
      const postData = { content };
      if (image) postData.image = await readFileAsDataURL(image);

      createPostMutation(postData);
    } catch (error) {
      console.error("Error in handlePostCreation:", error);
    }
  };

  const resetForm = () => {
    setContent("");
    setImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      readFileAsDataURL(file).then(setImagePreview);
    } else {
      setImagePreview(null);
    }
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div style={{ backgroundColor: "#ffff", borderRadius: "0.5rem", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", marginBottom: "1rem", padding: "1rem" }}>
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <img
          src={user.profilePicture || "/avatar.png"}
          alt={user.name}
          style={{ width: "3rem", height: "3rem", borderRadius: "50%" }}
        />
        <textarea
          placeholder="What's on your mind?"
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "0.5rem",
            backgroundColor: "#ffff",
            color: "#120D31",
            border: "none",
            outline: "none",
            resize: "none",
            transition: "background-color 0.2s",
            minHeight: "100px",
          }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#F6F0F0")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#F6F0F0")}
          onFocus={(e) => (e.currentTarget.style.backgroundColor = "#F6F0F0")}
        />
      </div>

      {imagePreview && (
        <div style={{ marginTop: "1rem" }}>
          <img src={imagePreview} alt="Selected" style={{ width: "100%", height: "auto", borderRadius: "0.5rem" }} />
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              color: "#302F4D",
              transition: "color 0.2s",
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#A57982")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#302F4D")}
          >
            <Image size={20} style={{ marginRight: "0.5rem" }} />
            <span>Photo</span>
            <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
          </label>
        </div>

        <button
          style={{
            backgroundColor: "#302F4D",
            color: "#ffff",
            borderRadius: "0.5rem",
            padding: "0.5rem 1rem",
            transition: "background-color 0.2s",
          }}
          onClick={handlePostCreation}
          disabled={isPending}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#120D31")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#302F4D")}
        >
          {isPending ? <Loader style={{ width: "1.25rem", height: "1.25rem", animation: "spin 1s linear infinite" }} /> : "Share"}
        </button>
      </div>
    </div>
  );
};

export default PostCreation;