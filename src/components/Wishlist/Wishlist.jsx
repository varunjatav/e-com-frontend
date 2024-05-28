import React, { useContext } from "react";
import styles from "./Wishlist.module.css";
import wishlist from "../../assets/wishlist.png";
import { useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const Wishlist = () => {
  const {addtocart, status, getWishList ,wishListData, authToken , deleteWishlist} = useContext(AppContext);

  useEffect(() => {  
    getWishList();
  }, [authToken,status]);

  console.log("wishListData : ",wishListData);

  if (wishListData.length === 0 ) {
    return (
      <div className={styles.emptyWishlistMain}>
        <div className={styles.emptyYourWishlist}>
          <h2>Your Wishlist</h2>
        </div>
        <img src={wishlist} alt="" />
        <p>Uh Oh!</p>
        <p>Your Wishlist Seems to be Empty!</p>
        <button>start Shoping</button>
      </div>
    );
  }

  return (
    <div className={styles.wishlistMain}>
      <h2>Your Wishlist</h2>
      <div className={styles.wishListDetails}>
        {wishListData && wishListData.items.map((data) => (
          
          <div key={data.product.id} className={styles.single__maindiv}>
            <img className={styles.single__image} src={data.product.image} alt="name" />

            <p className={styles.single__pricetag}>&#8377; {data.product.price}</p>

            <p>{data.product.name}</p>
            <div className={styles.single__buttondiv}>
              <button onClick={() => addtocart(data.product._id)}>Cart</button>
              <button onClick={() => deleteWishlist(data.product._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
