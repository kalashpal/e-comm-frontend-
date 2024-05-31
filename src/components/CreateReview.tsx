import React, { useState } from 'react';

interface Review {
  productId: string;
  userId: string;
  rating: number;
  comment: string;
}

const CreateReview: React.FC = () => {
  const [review, setReview] = useState<Review>({
    productId: '',
    userId: '',
    rating: 0,
    comment: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
      });
      if (response.ok) {
        alert('Review created successfully');
      } else {
        alert('Failed to create review');
      }
    } catch (error) {
      console.error('Error creating review:', error);
      alert('Error creating review');
    }
  };

  return (
    <div>
      <h1>Create Review</h1>
      <input
        type="text"
        name="productId"
        placeholder="Product ID"
        value={review.productId}
        onChange={handleChange}
      />
      <input
        type="text"
        name="userId"
        placeholder="User ID"
        value={review.userId}
        onChange={handleChange}
      />
      <input
        type="number"
        name="rating"
        placeholder="Rating"
        value={review.rating}
        onChange={handleChange}
      />
      <input
        type="text"
        name="comment"
        placeholder="Comment"
        value={review.comment}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Create Review</button>
    </div>
  );
};

export default CreateReview;
