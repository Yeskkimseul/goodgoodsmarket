import React from 'react';

type ReviewTopProps = {
  image: string;
  title: string;
  date: string;
};

const ReviewTop: React.FC<ReviewTopProps> = ({ image, title, date }) => {
  return (
    <div>
      <img
        src={image}
        alt={title}
      />
      <div>
        <h2>{title}</h2>
        <p>{date}</p>
      </div>
    </div>
  );
};

export default ReviewTop;