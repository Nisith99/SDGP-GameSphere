import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const FriendRequest = ({ request }) => {
  const queryClient = useQueryClient();

  const { mutate: acceptConnectionRequest, isLoading: isAccepting } = useMutation({
    mutationFn: (requestId) => axiosInstance.put(`/connections/accept/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request accepted");
      queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
      queryClient.invalidateQueries({ queryKey: ["connections"] }); // Refresh connections
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to accept request");
    },
  });

  const { mutate: rejectConnectionRequest, isLoading: isRejecting } = useMutation({
    mutationFn: (requestId) => axiosInstance.put(`/connections/reject/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request rejected");
      queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to reject request");
    },
  });

  // Check if request or sender is valid
  if (!request || !request.sender) {
    console.error("Invalid request data:", request);
    return <div className="text-red-500">Invalid friend request data</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <Link to={`/profile/${request.sender.username}`}>
          <img
            src={request.sender.profilePicture || "/avatar.png"}
            alt={request.sender.name || "User"}
            className="w-16 h-16 rounded-full object-cover"
          />
        </Link>

        <div>
          <Link to={`/profile/${request.sender.username}`} className="font-semibold text-lg text-[#120D31]">
            {request.sender.name || "Unknown User"}
          </Link>
          <p className="text-gray-600">{request.sender.headline || "No headline"}</p>
        </div>
      </div>

      <div className="space-x-2">
        <button
          className="bg-[#302F4D] text-white px-4 py-2 rounded-md hover:bg-[#120D31] transition-colors disabled:opacity-50"
          onClick={() => acceptConnectionRequest(request._id)}
          disabled={isAccepting || isRejecting}
        >
          {isAccepting ? "Accepting..." : "Accept"}
        </button>
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
          onClick={() => rejectConnectionRequest(request._id)}
          disabled={isAccepting || isRejecting}
        >
          {isRejecting ? "Rejecting..." : "Reject"}
        </button>
      </div>
    </div>
  );
};

export default FriendRequest;