import React from 'react';
import styles from './ReviewTop.module.css'

type ReviewTopProps = {
  image: string;
  title: string;
  date: string;
};

const ReviewTop: React.FC<ReviewTopProps> = ({ image, title, date }) => {
  return (
    <div className={styles.wrapper}>
      <img
        src={image}
        alt={title}
      />
      <div className={styles.txt}>
        <div className='subtit2'>{title}</div>
        <p className='caption'>{date}</p>
      </div>
    </div>
  );
};

export default ReviewTop;