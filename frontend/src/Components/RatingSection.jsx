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
                        <StarHalf className="text-[#B98EA7] w-6 h-6" />
                    ) : (
                        <Star
                            className={`w-6 h-6 ${
                                filled ? 'text-[#B98EA7] fill-[#B98EA7]' : 'text-gray-300'
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
            <div className="bg-white/90 rounded-xl shadow-md p-6 border border-[#F0D3F7]">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="flex space-x-1 mb-4">
                        {Array(5).fill(0).map((_, i) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-gray-200"></div>
                        ))}
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    const { averageRating = 0, ratingCount = 0, ratings = [] } = ratingData || {};

    return (
        <div className="bg-white/90 rounded-xl shadow-md p-6 border border-[#F0D3F7] hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-bold text-[#A57982] mb-4 tracking-tight">
                Player Rating
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <div className="flex flex-col items-center mb-4 md:mb-0">
                    <div className="flex items-center">
                        {renderStars(averageRating)}
                        <span className="text-xl font-bold ml-2 text-[#302F4D]">
                            {averageRating.toFixed(1)}
                        </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                        Based on {ratingCount} {ratingCount === 1 ? 'rating' : 'ratings'}
                    </p>
                </div>

                <button
                    onClick={() => setShowRatings(!showRatings)}
                    className="px-4 py-2 text-sm bg-[#F0D3F7] text-[#302F4D] rounded-full hover:bg-[#B98EA7] hover:text-white transition-colors"
                >
                    {showRatings ? 'Hide Ratings' : 'View All Ratings'}
                </button>
            </div>

            {showRatings && ratings.length > 0 && (
                <div className="mb-6 max-h-64 overflow-y-auto rounded border border-[#F0D3F7] p-4">
                    <h3 className="text-lg font-semibold text-[#302F4D] mb-3">Recent Ratings</h3>
                    {ratings.map((rating, index) => (
                        <div key={index} className="p-3 rounded bg-[#F0D3F7]/30 mb-2 last:mb-0">
                            <div className="flex items-center">
                                <img
                                    src={rating.ratedBy.profilePicture || '/avatar.png'}
                                    alt={rating.ratedBy.name}
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                                <div>
                                    <p className="font-medium text-[#302F4D]">
                                        {rating.ratedBy.name}
                                    </p>
                                    <div className="flex items-center">
                                        <div className="flex">
                                            {renderStars(rating.score)}
                                        </div>
                                        <span className="text-xs text-gray-500 ml-2">
                                            {new Date(rating.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {rating.comment && (
                                <p className="mt-2 text-gray-700 text-sm">{rating.comment}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {!isOwnProfile && (
                <div className="border-t border-[#F0D3F7] pt-4 mt-4">
                    <h3 className="text-lg font-semibold text-[#302F4D] mb-3">
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
                        className="w-full p-3 rounded bg-[#F0D3F7]/30 text-[#302F4D] border border-[#B98EA7] focus:border-[#A57982] focus:outline-none mb-4"
                        rows="3"
                    />

                    <button
                        onClick={handleRatingSubmit}
                        disabled={isSubmitting || userRating === 0}
                        className="w-full bg-[#A57982] hover:bg-[#B98EA7] text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Rating'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default RatingSection;