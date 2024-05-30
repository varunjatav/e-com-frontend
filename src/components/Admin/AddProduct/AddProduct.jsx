import React, { useRef, useState } from "react";
import styles from "./AddProduct.module.css";
import defaultImage from "../../../assets/upload-product.jpg";

const AddProduct = () => {
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const fileUploadRef = useRef(null);
  const categoryRef = useRef(null);
  const shippingRef = useRef(null);
  const RatingRef = useRef(null);
  const [productUrl, setProductUrl] = useState(defaultImage);

  const postData = async (e) => {
    e.preventDefault();
    try {
      if (
        nameRef.current.value === "" ||
        priceRef.current.value === "" ||
        fileUploadRef.current.value === "" ||
        categoryRef.current.value === "" ||
        RatingRef.current.value === "" ||
        shippingRef.current.value === ""
      ) {
        // console.log(addressObj);
        alert("Please fill Complete Details");
        return;
      }
      const uploadedFile = fileUploadRef.current.files[0];
      // console.log(uploadedFile);
      // const cashedURL = URL.createObjectURL(uploadedFile);
      // setProductUrl(cashedURL);
      const formData = new FormData();
      formData.append("name", nameRef.current.value);
      formData.append("price", priceRef.current.value);
      formData.append("file",uploadedFile);
      formData.append("category", categoryRef.current.value);
      formData.append("rating", RatingRef.current.value)
      formData.append("shipping", shippingRef.current.value);
      
      let res = await fetch("http://localhost:8000/jwellery/add", {
        method: "POST",
        body: formData,
      });
      // if (res.status === 201) {
        const data = await res.json();
        console.log(data);
        setProductUrl(data.image?.location);

        nameRef.current.value = null;
        priceRef.current.value = null;
        fileUploadRef.current.value = null;
        categoryRef.current.value = null;
        RatingRef.current.value = null;
        shippingRef.current.value = null;
        alert("Product added successfully");
      // }
    } catch (error) {
      console.log("error", error);
    }

    // let data1 = await res.json();
  };
  const handleImageUpload = () => {
    // event.preventDefault();
    fileUploadRef.current.click();
  };

  const uploadImageDisplay = () => {
    // e.preventDefault();
    const uploadedFile = fileUploadRef.current.files[0];
    console.log(uploadedFile);
    const cashedURL = URL.createObjectURL(uploadedFile);
    console.log(cashedURL);
    setProductUrl(cashedURL);
    // const formData = new FormData();
    
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
            <input type="text" max={5} placeholder="Category" ref={categoryRef} />
          </div>
          <div className={styles.input_div}>
            <p>Rating</p>
            <input type="number" placeholder="Rating" ref={RatingRef} />
          </div>
          <div className={styles.input_div}>
            <p>Shipping</p>
            <input type="text" placeholder="Shipping Info" ref={shippingRef} />
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
