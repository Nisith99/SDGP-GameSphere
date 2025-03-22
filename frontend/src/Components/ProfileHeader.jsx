import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { Camera, MapPin, Star } from "lucide-react";

const ProfileHeader = ({ userData, onSave, isOwnProfile }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedData, setEditedData] = useState({});
	const queryClient = useQueryClient();

	const { data: ratingData } = useQuery({
		queryKey: ["userRatings", userData.username],
		queryFn: () => axiosInstance.get(`/users/ratings/${userData.username}`).then(res => res.data),
		enabled: !!userData.username,
	});

	const averageRating = ratingData?.averageRating || 0;
	const ratingCount = ratingData?.ratingCount || 0;

	const { mutate: updateProfile, isLoading: isUpdating } = useMutation({
		mutationFn: async (formData) => {
			const response = await axiosInstance.put("/users/profile", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			return response.data;
		},
		onSuccess: (data) => {
			toast.success("Profile updated successfully");
			// Merge updated data with existing userData to preserve unchanged fields
			const updatedUserData = { ...userData, ...data.user };
			queryClient.setQueryData(["userProfile", userData.username], updatedUserData);
			queryClient.setQueryData(["authUser"], updatedUserData);
			queryClient.invalidateQueries(["userProfile", userData.username]);
			setEditedData({});
			setIsEditing(false);
		},
		onError: (error) => {
			console.error("Update profile error:", error.response?.data || error);
			toast.error(error.response?.data?.message || "Failed to update profile");
		},
	});

	const handleSaveChanges = () => {
		if (Object.keys(editedData).length === 0) {
			setIsEditing(false);
			return;
		}

		const formData = new FormData();
		if (editedData.name) formData.append("name", editedData.name);
		if (editedData.headline) formData.append("headline", editedData.headline);
		if (editedData.location) formData.append("location", editedData.location);
		if (editedData.profilePicture) formData.append("profilePicture", editedData.profilePicture);
		if (editedData.bannerImg) formData.append("bannerImg", editedData.bannerImg);

		updateProfile(formData);
	};

	const handleFileChange = (e, field) => {
		const file = e.target.files[0];
		if (file) {
			setEditedData({ ...editedData, [field]: file });
		}
	};

	return (
		<div className="bg-gray shadow rounded-lg mb-6">
			<div className="relative">
				<img
					src={
						editedData.bannerImg
							? URL.createObjectURL(editedData.bannerImg)
							: userData.bannerImg || "/banner-placeholder.jpg"
					}
					alt="Banner"
					className="w-full h-48 object-cover rounded-t-lg"
				/>
				{isOwnProfile && isEditing && (
					<div className="absolute top-2 right-2">
						<label className="cursor-pointer bg-gray-800 text-white px-2 py-1 rounded">
							Change Banner
							<input
								type="file"
								accept="image/*"
								onChange={(e) => handleFileChange(e, "bannerImg")}
								className="hidden"
							/>
						</label>
					</div>
				)}
			</div>

			<div className="p-4">
				<div className="relative -mt-16 mb-4">
					<img
						src={
							editedData.profilePicture
								? URL.createObjectURL(editedData.profilePicture)
								: userData.profilePicture || "/avatar.png"
						}
						alt={userData.name}
						className="w-32 h-32 rounded-full border-4 border-white mx-auto"
					/>
					{isOwnProfile && isEditing && (
						<label className="absolute bottom-0 right-0 w-8 h-8 text-gray-500 cursor-pointer">
							<Camera />
							<input
								type="file"
								accept="image/*"
								onChange={(e) => handleFileChange(e, "profilePicture")}
								className="hidden"
							/>
						</label>
					)}
				</div>

				<div className="text-center mb-4">
					{isEditing ? (
						<input
							type="text"
							value={editedData.name ?? userData.name}
							onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
							className="text-2xl font-bold mb-2 text-center w-full bg-gray-800 text-white border-none"
						/>
					) : (
						<h1 className="text-2xl font-bold mb-2">{userData.name}</h1>
					)}

					{isEditing ? (
						<input
							type="text"
							value={editedData.headline ?? userData.headline}
							onChange={(e) => setEditedData({ ...editedData, headline: e.target.value })}
							className="text-gray-600 text-center w-full bg-gray-800 text-white border-none"
						/>
					) : (
						<p className="text-gray-600">{userData.headline}</p>
					)}

					{!isEditing && averageRating > 0 && (
						<div className="flex items-center justify-center mt-2 mb-2">
							<div className="flex">
								{[1, 2, 3, 4, 5].map((star) => (
									<Star
										key={star}
										size={16}
										className={`${star <= Math.round(averageRating)
												? "text-yellow-400 fill-yellow-400"
												: "text-gray-400"
											}`}
									/>
								))}
							</div>
							<span className="ml-2 text-gray-400 text-sm">
								{averageRating.toFixed(1)} ({ratingCount})
							</span>
						</div>
					)}

					<div className="flex justify-center items-center mt-2">
						<MapPin size={16} className="text-gray-500 mr-1" />
						{isEditing ? (
							<input
								type="text"
								value={editedData.location ?? userData.location}
								onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
								className="text-gray-600 text-center bg-gray-800 text-white border-none"
							/>
						) : (
							<span className="text-gray-600">{userData.location}</span>
						)}
					</div>
				</div>

				{isOwnProfile && (
					<div className="flex justify-center gap-4">
						{isEditing ? (
							<>
								<button
									onClick={handleSaveChanges}
									disabled={isUpdating}
									className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
								>
									{isUpdating ? "Saving..." : "Save"}
								</button>
								<button
									onClick={() => {
										setEditedData({});
										setIsEditing(false);
									}}
									className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
								>
									Cancel
								</button>
							</>
						) : (
							<button
								onClick={() => setIsEditing(true)}
								className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
							>
								Edit Profile
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default ProfileHeader;