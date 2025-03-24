import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import {
  ExternalLink,
  Eye,
  MessageSquare,
  ThumbsUp,
  Trash2,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { formatDistanceToNow } from "date-fns";

const NotificationsPage = () => {
  const { data: authUser, isLoading: authLoading } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const { 
    data: notifications, 
    isLoading: notificationsLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await axiosInstance.get("/notifications");
      console.log("Notifications API response:", response.data);
      return response.data;
    },
    enabled: !!authUser,
  });

  const { mutate: markAsReadMutation } = useMutation({
    mutationFn: (id) => axiosInstance.put(`/notifications/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      toast.success("Notification marked as read");
    },
    onError: (error) => {
      toast.error("Failed to mark as read: " + (error.message || "Unknown error"));
    },
  });

  const { mutate: deleteNotificationMutation } = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/notifications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      toast.success("Notification deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete notification: " + (error.message || "Unknown error"));
    },
  });

  const renderNotificationIcon = (type) => {
    switch (type) {
      case "like":
        return <ThumbsUp className="text-[#A57982]" />;
      case "comment":
        return <MessageSquare className="text-[#B98EA7]" />;
      case "connectionAccepted":
        return <UserPlus className="text-[#A57982]" />;
      case "message":
        return <MessageSquare className="text-[#302F4D]" />;
      default:
        return null;
    }
  };

  const renderNotificationContent = (notification) => {
    switch (notification?.type) {
      case "like":
        return (
          <span>
            <strong>{notification?.relatedUser?.name || "Someone"}</strong> liked your post
          </span>
        );
      case "comment":
        return (
          <span>
            <Link
              to={`/profile/${notification?.relatedUser?.username || ""}`}
              className="font-bold text-[#120D31]"
            >
              {notification?.relatedUser?.name || "Someone"}
            </Link>{" "}
            commented on your post
          </span>
        );
      case "connectionAccepted":
        return (
          <span>
            <Link
              to={`/profile/${notification?.relatedUser?.username || ""}`}
              className="font-bold text-[#120D31]"
            >
              {notification?.relatedUser?.name || "Someone"}
            </Link>{" "}
            accepted your team invite
          </span>
        );
      case "message":
        return (
          <span>
            <Link
              to={`/profile/${notification?.relatedUser?.username || ""}`}
              className="font-bold text-[#120D31]"
            >
              {notification?.relatedUser?.name || "Someone"}
            </Link>{" "}
            sent you a message
          </span>
        );
      default:
        return <span>Unknown notification type</span>;
    }
  };

  const renderRelatedPost = (relatedPost) => {
    if (!relatedPost) return null;

    return (
      <Link
        to={`/post/${relatedPost?._id || ""}`}
        className="mt-2 p-2 bg-[#F0D3F7]/50 rounded-md flex items-center space-x-2 hover:bg-[#B98EA7]/30 transition-colors"
      >
        {relatedPost?.image && (
          <img
            src={relatedPost.image}
            alt="Post preview"
            className="w-10 h-10 object-cover rounded border border-[#302F4D]/20"
          />
        )}
        <div className="flex-1 overflow-hidden">
          <p className="text-sm text-[#302F4D]/80 truncate">
            {relatedPost?.content || "No content available"}
          </p>
        </div>
        <ExternalLink size={14} className="text-[#A57982]" />
      </Link>
    );
  };

  // Early return for loading or no authUser
  if (authLoading || !authUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F0D3F7] to-[#B98EA7] flex items-center justify-center">
        <p className="text-[#302F4D]/80">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffff] via-[#ffff] to-[#B98EA7]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 container mx-auto py-8 px-4">
        <div className="col-span-1 lg:col-span-1">
          <Sidebar user={authUser} />
        </div>
        <div className="col-span-1 lg:col-span-3">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-[#302F4D]/20">
            <h1 className="text-2xl font-extrabold text-[#120D31] mb-6">
              Notifications
            </h1>

            {notificationsLoading ? (
              <p className="text-[#302F4D]/80">Loading notifications...</p>
            ) : isError ? (
              <p className="text-[#A57982]">
                Error loading notifications: {error?.message || "Unknown error"}
              </p>
            ) : Array.isArray(notifications) && notifications.length > 0 ? (
              <ul>
                {notifications.map((notification) => (
                  <li
                    key={notification?._id}
                    className={`bg-white border rounded-lg p-4 my-4 transition-all hover:shadow-md ${
                      !notification?.read
                        ? "border-[#B98EA7]"
                        : "border-[#302F4D]/20"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <Link
                          to={`/profile/${notification?.relatedUser?.username || ""}`}
                        >
                          <img
                            src={
                              notification?.relatedUser?.profilePicture ||
                              "/avatar.png"
                            }
                            alt={notification?.relatedUser?.name || "User"}
                            className="w-12 h-12 rounded-full object-cover border-2 border-[#A57982]/50"
                          />
                        </Link>

                        <div>
                          <div className="flex items-center gap-2">
                            <div className="p-1 bg-[#F0D3F7]/50 rounded-full">
                              {renderNotificationIcon(notification?.type)}
                            </div>
                            <p className="text-sm text-[#302F4D]">
                              {renderNotificationContent(notification)}
                            </p>
                          </div>
                          <p className="text-xs text-[#302F4D]/60 mt-1">
                            {notification?.createdAt
                              ? formatDistanceToNow(
                                  new Date(notification.createdAt),
                                  { addSuffix: true }
                                )
                              : "Unknown time"}
                          </p>
                          {renderRelatedPost(notification?.relatedPost)}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {!notification?.read && (
                          <button
                            onClick={() => markAsReadMutation(notification?._id)}
                            className="p-1 bg-[#B98EA7]/20 text-[#B98EA7] rounded hover:bg-[#B98EA7]/40 transition-colors"
                            aria-label="Mark as read"
                          >
                            <Eye size={16} />
                          </button>
                        )}

                        <button
                          onClick={() =>
                            deleteNotificationMutation(notification?._id)
                          }
                          className="p-1 bg-[#A57982]/20 text-[#A57982] rounded hover:bg-[#A57982]/40 transition-colors"
                          aria-label="Delete notification"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8">
                <div className="bg-[#F0D3F7]/50 p-3 rounded-full shadow-md inline-block mb-4">
                  <svg
                    className="h-8 w-8 text-[#A57982]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-[#120D31]">
                  No notifications at the moment
                </p>
                <p className="text-[#302F4D]/60 mt-2">
                  Check back later for updates from your team!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="mt-8 pb-6">
        <div className="max-w-md mx-auto px-4 text-center text-xs text-[#302F4D]/60">
          <div className="mt-3 space-x-4">
            <a href="#" className="hover:text-[#120D31]">
              Help Center
            </a>
            <a href="#" className="hover:text-[#120D31]">
              Privacy & Terms
            </a>
            <a href="#" className="hover:text-[#120D31]">
              Accessibility
            </a>
          </div>
          <p className="mt-4">
            GameSphere © {new Date().getFullYear()} | The Ultimate Sports Gaming
            Platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NotificationsPage;