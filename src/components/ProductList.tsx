import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    company: string;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            let result = await fetch('http://localhost:5000/api/products');
            let data = await result.json();
            console.log("Fetched products:", data); // Log fetched products
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const deleteProduct = async (_id: string) => {
        console.warn("Deleting product with _id:", _id); // Log the _id being passed
        try {
            let result = await fetch(`http://localhost:5000/api/products/${_id}`, {
                method: 'DELETE',
            });
            if (result.ok) {
                // Update the state to remove the deleted product
                setProducts(products.filter(product => product._id !== _id));
            } else {
                console.error("Failed to delete the product.");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="product-list">
            <h1>Products List</h1>
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.map((item, index) => (
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={() => {
                                console.log("Clicked delete for product _id:", item._id); 
                                deleteProduct(item._id);
                            }}>Delete</button>
                           <button><Link to={"/update/" + item._id} className="Update-Link">Update</Link></button> 
                        </li>
                    </ul>
                ))
            }
        </div>
    );
}

export default ProductList;
