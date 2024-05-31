// CreateOrder.tsx

import React, { useState } from 'react';

interface Product {
  productId: string;
  quantity: number;
}

interface Order {
  userId: string;
  products: Product[];
  totalAmount: number;
}

const CreateOrder: React.FC = () => {
  const [order, setOrder] = useState<Order>({
    userId: '',
    products: [{ productId: '', quantity: 1 }], // Initialize with one product field
    totalAmount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'userId' || name === 'totalAmount') {
      setOrder({ ...order, [name]: value });
    }
  };

  const handleProductChange = (index: number, field: string, value: string | number) => {
    const newProducts = order.products.map((product, i) => 
      i === index ? { ...product, [field]: value } : product
    );
    setOrder({ ...order, products: newProducts });
  };

  const addProduct = () => {
    setOrder({ ...order, products: [...order.products, { productId: '', quantity: 1 }] });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      if (response.ok) {
        alert('Order created successfully');
      } else {
        alert('Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error creating order');
    }
  };

  return (
    <div className="product">
      <h1>Create Order</h1>
      <div className="form-group">
        <label>User ID:</label>
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          value={order.userId}
          onChange={handleChange}
        />
      </div>
      {order.products.map((product, index) => (
        <div key={index} className="form-group">
          <label>Product ID:</label>
          <input
            type="text"
            placeholder="Product ID"
            value={product.productId}
            onChange={(e) => handleProductChange(index, 'productId', e.target.value)}
          />
          <label>Quantity:</label>
          <input
            type="number"
            placeholder="Quantity"
            value={product.quantity}
            onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value))}
          />
        </div>
      ))}
      <button onClick={addProduct}>Add Product</button>
      <div className="form-group">
        <label>Total Amount:</label>
        <input
          type="number"
          name="totalAmount"
          placeholder="Total Amount"
          value={order.totalAmount}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSubmit} className="submit-button">Create Order</button>
    </div>
  );
};

export default CreateOrder;
