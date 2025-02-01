import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  let noOfStars = 5;

  const handleClick = (index) => {
    setRating(index);
  };

  const handleMouseMove = (index) => {
    setHover(index);
  };

  const handleMouseLeave = () => {
    setHover(rating);
  };

  const getEmoji = (rating) => {
    switch (rating) {
      case 1:
      case 2:
        return "😕";
      case 3:
        return "😊";
      case 4:
        return "😍";
      case 5:
        return "🥰";
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div className="flex">
        {Array.from({ length: noOfStars }, (_, index) => index + 1).map(
          (star) => (
            <FaStar
              key={star}
              className={`cursor-pointer transition-all ${
                star <= (hover || rating) ? "text-[#FFD700]" : "text-[#000000]"
              }`}
              onClick={() => handleClick(star)}
              onMouseMove={() => handleMouseMove(star)}
              onMouseLeave={handleMouseLeave}
              size={40}
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              title={`Rate ${star} star${star > 1 ? "s" : ""}`}
            />
          )
        )}
      </div>

      <div className="mt-4 p-5 text-center">
        {rating === 0 ? (
          <h3 className="text-xl text-gray-700">Please give a rating</h3>
        ) : (
          <div>
            <h3 className="text-xl text-gray-700">
              You gave {rating} star{rating > 1 ? "s" : ""}
            </h3>
            <span className="text-3xl">{getEmoji(rating)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StarRating;
