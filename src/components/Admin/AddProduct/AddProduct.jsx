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
        fileUploadRef.current.files.length === 0 ||
        categoryRef.current.value === "" ||
        RatingRef.current.value === "" ||
        shippingRef.current.value === ""
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
      formData.append("category", categoryRef.current.value);
      formData.append("rating", RatingRef.current.value);
      formData.append("shipping", shippingRef.current.value);

      let res = await fetch("http://localhost:8000/jwellery/add", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data.product.image.data);
      setProductUrl(data.product.image.data);

      nameRef.current.value = "";
      priceRef.current.value = "";
      fileUploadRef.current.value = "";
      categoryRef.current.value = "";
      RatingRef.current.value = "";
      shippingRef.current.value = "";
      alert("Product added successfully");
    } catch (error) {
      console.log("error", error);
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
            <input
              type="text"
              max={5}
              placeholder="Category"
              ref={categoryRef}
            />
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
