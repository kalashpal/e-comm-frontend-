import React, { useEffect, useState } from 'react';

interface Order {
  _id: string;
  userId: string;
  products: { productId: string, quantity: number }[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        console.log('Orders data:', data); // Log data to inspect
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    fetchOrders();
  }, []);
  return (
    <div>
      <h1>Order List</h1>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            Order ID: {order._id}, Total Amount: {order.totalAmount}, Status: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
