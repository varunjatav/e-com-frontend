  import React, { useContext, useEffect, useState } from "react";
  import Styles from "./ProductList.module.css";
  import { MdDelete } from "react-icons/md";
  import { IoSearch } from "react-icons/io5";

  const ProductList = () => {
    
  
    const [productList, setProductList] = useState([]);
    const [status, setStatus] = useState(false);
    const [query, setQuery ] = useState("");
    useEffect(() => {
      const getProductList = async () => {
        try {
          const res = await fetch(`http://localhost:8000/jwellery`);
          const data = await res.json();
          setProductList(data);
        } catch (error) {
          console.log(error);
        }
      };
      getProductList();
    }, [status]);

    const searchData = async () => {
      let resp;
      if (query === "") {
        resp = await fetch(`http://localhost:8000/jwellery`);
      } else {
        resp = await fetch(
          `http://localhost:8000/jwellery/q/cat?category=${query}`
        );
      }
  
      let apiData = await resp.json();
      setProductList(apiData);
      setQuery("");
    };
  
    
    const bufferToBase64 = (buffer) => {
      const binary = buffer.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
      return window.btoa(binary);
    };

    // remove product function
    const removeProduct = async (productId) => {
      try {
        const res = await fetch(`http://localhost:8000/jwellery/delete/${productId}`, {
          method: 'DELETE'
        });
        setStatus(!status);
      } catch (error) {
        console.log("error :", error);
      }
     

    }
  
    // console.log("data from product list: ",productList);
    return (
      <div className={Styles.mainContainer}>
        <h1>Product List</h1>
        <div className={Styles.searchDiv}>
          <input type="text" placeholder="Search Products" className={Styles.searchInput} onChange={(e)=>setQuery(e.target.value)}/>
          <button className={Styles.searchButton} onClick={searchData}><IoSearch /></button>
        </div>
        <table className={Styles.table}>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Rating</th>
            <th>Product Category</th> 
            <th>Remove</th>
          </tr>
          {productList.map((product, i) => {
            return (
              <tr key={i}>
                <td>
                {product.image && product.image.data ? (
                  <img src={`data:${product.image.contentType};base64,${bufferToBase64(product.image.data.data)}`} alt={product.name} width={"100px"} />
                ) : (
                  <img src={product.image} alt={product.name} width={"100px"} />
                )}
                </td>
                <td>{product.name}</td>
                <td>&#8377; {product.price}</td>
                <td>{product.star}</td>
                <td>{product.category}</td>
                <td>
                  <button onClick={() =>removeProduct (product._id)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  };

  export default ProductList;