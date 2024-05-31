import React, { useEffect, useState } from 'react';

interface Review {
  _id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const ReviewList: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/reviews');
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        console.log('Reviews data:', data); // Log data to inspect
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
  
    fetchReviews();
  }, [])
  return (
    <div>
      <h1>Review List</h1>
      <ul>
        {reviews.map(review => (
          <li key={review._id}>
            Product ID: {review.productId}, Rating: {review.rating}, Comment: {review.comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
