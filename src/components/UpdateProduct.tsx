import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface UpdateProductState {
  name: string;
  price: string;
  category: string;
  company: string;
}

const UpdateProduct: React.FC = () => {
  const [state, setState] = useState<UpdateProductState>({
    name: "",
    price: "",
    category: "",
    company: ""
  });

  const params = useParams<{ id: string }>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  useEffect(()=>{
    getProductDetails();
  },[])
  
  const getProductDetails= async()=>{
    console.warn(params);
    let result=await fetch(`http://localhost:5000/api/products/${params.id}`);
    const data= await result.json();
    setState({
        name: data.name,
        price: data.price,
        category: data.category,
        company: data.company
      });
    
  }

  const updateProduct = async () => {
    console.warn(state.name, state.price, state.category, state.company);

    try {
      const result = await fetch(`http://localhost:5000/api/products/${params.id}`, {
        method: "Put",
        body: JSON.stringify({
          name: state.name,
          price: state.price,
          category: state.category,
          company: state.company
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!result.ok) {
        const errorText = await result.text();
        throw new Error(`HTTP error! Status: ${result.status}. Response: ${errorText}`);
      }

      const data = await result.json();
      alert("product has been updated")
      console.log(data);
    } catch (error) {
      console.error("There was an error updating the product:", error);
    }
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        name="name"
        value={state.name}
        onChange={handleChange}
        placeholder="Update product name"
        className="inputBox"
      />
      <input
        type="text"
        name="price"
        value={state.price}
        onChange={handleChange}
        placeholder="Update price"
        className="inputBox"
      />
      <input
        type="text"
        name="category"
        value={state.category}
        onChange={handleChange}
        placeholder="Update category"
        className="inputBox"
      />
      <input
        type="text"
        name="company"
        value={state.company}
        onChange={handleChange}
        placeholder="Update product company"
        className="inputBox"
      />
      <button onClick={updateProduct} className="appButton">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
