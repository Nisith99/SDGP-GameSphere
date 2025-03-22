// RatingSection.jsx
import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import { Star, StarHalf } from 'lucide-react';
import toast from 'react-hot-toast';

const RatingSection = ({ userData, isOwnProfile }) => {
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [showRatings, setShowRatings] = useState(false);
    const queryClient = useQueryClient();

    const { data: ratingData, isLoading } = useQuery({
        queryKey: ['userRatings', userData.username],
        queryFn: () => axiosInstance.get(`/users/ratings/${userData.username}`).then(res => res.data),
        enabled: !!userData.username,
    });

    useEffect(() => {
        if (ratingData?.userRating) {
            setUserRating(ratingData.userRating.score);
            setComment(ratingData.userRating.comment);
        }
    }, [ratingData]);

    const { mutate: submitRating, isLoading: isSubmitting } = useMutation({
        mutationFn: (data) => axiosInstance.post(`/users/rate/${userData._id}`, data),
        onSuccess: () => {
            toast.success('Rating submitted successfully');
            queryClient.invalidateQueries(['userRatings', userData.username]);
            queryClient.invalidateQueries(['userProfile', userData.username]);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to submit rating');
        },
    });

    const handleRatingSubmit = () => {
        if (userRating === 0) {
            toast.error('Please select a rating');
            return;
        }
        console.log('Submitting rating for user ID:', userData._id); 
        submitRating({
            score: userRating,
            comment,
        });
    };

    const renderStars = (rating, count = 5, interactive = false) => {
        const stars = [];
        for (let i = 1; i <= count; i++) {
            const starValue = i;
            const filled = interactive
                ? i <= (hoverRating || userRating)
                : i <= Math.floor(rating);
            const half = !interactive && i === Math.ceil(rating) && !Number.isInteger(rating);

            stars.push(
                <span
                    key={i}
                    className={`cursor-${interactive ? 'pointer' : 'default'}`}
                    onMouseEnter={() => interactive && setHoverRating(starValue)}
                    onMouseLeave={() => interactive && setHoverRating(0)}
                    onClick={() => interactive && setUserRating(starValue)}
                >
                    {half ? (
                        <StarHalf className="text-yellow-400 w-6 h-6" />
                    ) : (
                        <Star
                            className={`w-6 h-6 ${
                                filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
                            }`}
                        />
                    )}
                </span>
            );
        }
        return stars;
    };

    if (isLoading) {
        return (
            <div className="bg-gray-900/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-blue-700/40">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
                    <div className="flex space-x-1 mb-4">
                        {Array(5).fill(0).map((_, i) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-gray-700"></div>
                        ))}
                    </div>
                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    const { averageRating = 0, ratingCount = 0, ratings = [] } = ratingData || {};

    return (
        <div className="bg-gray-900/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-pink-600/40 hover:shadow-pink-600/20 transition-all duration-300">
            <h2 className="text-2xl font-bold text-pink-400 mb-4 tracking-tight drop-shadow-md">
                Player Rating
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <div className="flex flex-col items-center mb-4 md:mb-0">
                    <div className="flex items-center">
                        {renderStars(averageRating)}
                        <span className="text-xl font-bold ml-2 text-white">
                            {averageRating.toFixed(1)}
                        </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                        Based on {ratingCount} {ratingCount === 1 ? 'rating' : 'ratings'}
                    </p>
                </div>

                <button
                    onClick={() => setShowRatings(!showRatings)}
                    className="px-4 py-2 text-sm bg-gray-800 text-blue-400 rounded-full hover:bg-gray-700 transition-colors"
                >
                    {showRatings ? 'Hide Ratings' : 'View All Ratings'}
                </button>
            </div>

            {showRatings && ratings.length > 0 && (
                <div className="mb-6 max-h-64 overflow-y-auto rounded border border-gray-700 p-4">
                    <h3 className="text-lg font-semibold text-gray-300 mb-3">Recent Ratings</h3>
                    {ratings.map((rating, index) => (
                        <div key={index} className="p-3 rounded bg-gray-800/60 mb-2 last:mb-0">
                            <div className="flex items-center">
                                <img
                                    src={rating.ratedBy.profilePicture || '/avatar.png'}
                                    alt={rating.ratedBy.name}
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                                <div>
                                    <p className="font-medium text-gray-200">
                                        {rating.ratedBy.name}
                                    </p>
                                    <div className="flex items-center">
                                        <div className="flex">
                                            {renderStars(rating.score)}
                                        </div>
                                        <span className="text-xs text-gray-400 ml-2">
                                            {new Date(rating.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {rating.comment && (
                                <p className="mt-2 text-gray-300 text-sm">{rating.comment}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {!isOwnProfile && (
                <div className="border-t border-gray-700 pt-4 mt-4">
                    <h3 className="text-lg font-semibold text-gray-300 mb-3">
                        Rate This Player
                    </h3>

                    <div className="flex justify-center mb-4">
                        <div className="flex space-x-1">
                            {renderStars(0, 5, true)}
                        </div>
                    </div>

                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Leave a comment (optional)"
                        className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:outline-none mb-4"
                        rows="3"
                    />

                    <button
                        onClick={handleRatingSubmit}
                        disabled={isSubmitting || userRating === 0}
                        className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Rating'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default RatingSection;