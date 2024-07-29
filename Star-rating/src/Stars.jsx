import { useState } from "react";

import emoji0 from "./assets/0.svg";
import emoji1 from "./assets/1.svg";
import emoji2 from "./assets/2.svg";
import emoji3 from "./assets/3.svg";
import emoji4 from "./assets/4.svg";
import emoji5 from "./assets/5.svg";

const Stars = ({ numOfStars = 5 }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  console.log(`rating: ${rating}`);
  console.log(`hover: ${hover}`);

  const emojis = [emoji0, emoji1, emoji2, emoji3, emoji4, emoji5];

  function handleOnClick(index) {
    // Toggle rating: if the star clicked is already the rating, reset to 0
    if (rating === index + 1) {
      setRating(0);
    } else {
      setRating(index + 1);
    }
  }

  function handleOnMouseEnter(index) {
    setHover(index + 1); // Set the hover state to index + 1
  }

  function handleOnMouseLeave() {
    setHover(0); // Reset hover state to 0
  }

  return (
    <>
      <div className="container">
        <div className="emoji_img">
          <img
            src={emojis[hover ? hover : rating]}
            className={hover || rating ? "ani" : ""}
            alt="some emojis"
          />
        </div>

        <div className="star_container">
          {[...Array(numOfStars)].map((_, index) => {
            return (
              <i
                key={index}
                onClick={() => handleOnClick(index)}
                onMouseEnter={() => handleOnMouseEnter(index)}
                onMouseLeave={handleOnMouseLeave}
                className={`fa-solid fa-star ${
                  (hover || rating) > index ? "active" : ""
                }`}
              ></i>
            );
          })}
        </div>
        <p>
          Rating: <strong>{hover ? hover : rating}</strong> star
          {hover || rating > 1 ? "s" : ""}
        </p>
      </div>
    </>
  );
};

export default Stars;
