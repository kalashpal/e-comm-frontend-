import React,{useState} from "react";
interface AddProductstate{
    name:string,
    price:string,
    category:string,
    company:string
}
const AddProduct:React.FC=()=>{
    const [state, setState] = useState<AddProductstate>({
        name: "",
        price: "",
        category: "",
        company:""
      });
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };
      const addProduct= async()=>{
        console.warn(state.name,state.price,state.category,state.company)
        const user=localStorage.getItem('user');
     if(user){
        const userId=JSON.parse(user)._id;
        const result= await fetch('http://localhost:5000/add-product',{
            method:'post',
            body: JSON.stringify({
                userId,
                name: state.name,
                price: state.price,
                category: state.category,
                company: state.company
              }),
            headers:{
                'Content-Type':'application/json'
            }
            
 });
 const data=await result.json();
 console.warn(result);
 alert("product has been added")
      }
      else{
        console.error("user not found");
      }
    };

    
    return(
        <div className="product">
           <h1>Add product</h1>
           <input type="text" name="name" value={state.name} onChange={handleChange} placeholder="Enter product name" className="inputBox"/>
           <input type="text" name="price" value={state.price} onChange={handleChange} placeholder="Enter price" className="inputBox"/>
           <input type="text"name="category" value={state.category} onChange={handleChange} placeholder="Enter category" className="inputBox"/>
           <input type="text"name="company" value={state.company} onChange={handleChange} placeholder="Enter product company" className="inputBox"/>
           <button onClick={addProduct} className="appButton">Add product</button>
        </div>
    )
}
export default AddProduct;


