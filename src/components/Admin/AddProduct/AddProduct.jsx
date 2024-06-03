import React, { useRef, useState } from "react";
import styles from "./AddProduct.module.css";
import defaultImage from "../../../assets/upload-product.jpg";

const AddProduct = () => {
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const fileUploadRef = useRef(null);
  const DescriptionRef = useRef(null);
  const QuantityRef = useRef(null);
  const [productUrl, setProductUrl] = useState(defaultImage);
  const [category, setCategory] = useState("");
  const postData = async (e) => {
    e.preventDefault();
    try {
      if (
        nameRef.current.value === "" ||
        priceRef.current.value === "" ||
        fileUploadRef.current.files.length === 0 ||
        QuantityRef.current.value === "" ||
        DescriptionRef.current.value === "" ||
        category === undefined ||
        category === ""
      ) {
        // console.log(addressObj);
        alert("Please fill Complete Details");
        return;
      }
      const uploadedFile = fileUploadRef.current.files[0];
      const formData = new FormData();
      formData.append("name", nameRef.current.value);
      formData.append("price", priceRef.current.value);
      formData.append("file", uploadedFile);
      formData.append("category", category);
      formData.append("quantity", QuantityRef.current.value);
      formData.append("description", DescriptionRef.current.value);

      let res = await fetch("http://localhost:8000/products/add", {
        method: "POST",
        body: formData,
      });
      if(res.status === 400){
        alert("Product add failed")
      }
      const data = await res.json();
      console.log(data.product.image.data);
      setProductUrl(data.product.image.data);

      nameRef.current.value = "";
      priceRef.current.value = "";
      fileUploadRef.current.value = "";
      QuantityRef.current.value = "";
      DescriptionRef.current.value = "";
      setCategory("");
      setProductUrl(defaultImage);
      alert("Product added successfully");
    } catch (error) {
      console.log("error", error.message);
    }

  };
  const handleImageUpload = () => {
    fileUploadRef.current.click();
  };

  const uploadImageDisplay = () => {
    const uploadedFile = fileUploadRef.current.files[0];
    const cashedURL = URL.createObjectURL(uploadedFile);
    setProductUrl(cashedURL);
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.formContainer}>
        <center>
          <img
            src={productUrl}
            alt="Product"
            className={styles.image}
            onClick={handleImageUpload}
          />
        </center>
        <form
          action=""
          className={styles.adminForm}
          onSubmit={(e) => {
            postData(e);
          }}
        >
          <input
            type="file"
            id="file"
            className={styles.fileInput}
            onChange={uploadImageDisplay}
            ref={fileUploadRef}
          />

          <div className={styles.input_div}>
            <p>Name</p>
            <input type="text" placeholder="Name" ref={nameRef} />
          </div>

          <div className={styles.input_div}>
            <p>Price</p>
            <input type="number" placeholder="Amount" ref={priceRef} />
          </div>

          <div className={styles.input_div}>
            <p>Category</p>
            <select name="category" id="category" className={styles.select} onChange={(e) => setCategory(e.target.value)}>
              <option value="" default>Select Category</option>
              <option value="rings">Rings</option>
              <option value="earrings">Earrings</option>
              <option value="mangalsutra">Mangalsutra</option>
              <option value="braceletes">Bracelets</option>
              <option value="solitiares">Solitiaries</option>
              <option value="kids">Kids</option>
            </select>
          </div>
          <div className={styles.input_div}>
            <p>Quantity</p>
            <input type="number" placeholder="Enter Quantity" ref={QuantityRef} />
          </div>
          <div className={styles.input_div}>
            <p>Description</p>
            <input type="text" placeholder="Description" ref={DescriptionRef} />
          </div>
          <div>
            <input className={styles.button} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
