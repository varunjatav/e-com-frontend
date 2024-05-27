import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import wishlist from "../../assets/wishlist.png";
import { Link as RouterLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { DeleteIcon } from "@chakra-ui/icons"

const Cart = () => {
  const { datas, total, deleteCart ,addtocart, decrementCart} = useContext(AppContext);
  
  if (datas.length === 0) {
    return (
      <div className={styles.emptyWishlistMain}>
        <div className={styles.emptyYourWishlist}>
          <h2>Your Cart</h2>
        </div>
        <img src={wishlist} alt="" />
        <p>Uh Oh!</p>
        <p>Your Cart Seems to be Empty!</p>
        <button>start Shoping</button>
      </div>
    );
  }

  return (
    <div className={styles.wishlistMain}>
      <h2>Your Cart</h2>
      <h3 className={styles.cart__totaltext}>Total amount : {total}</h3>
      <div className={styles.wishList_container}>
        <div className={styles.wishListDetails}>
          {datas.map((data) => (
            <div key={data.product.id} className={styles.single__maindiv}>
              <div
              className={styles.imageAndName}
              
              >
                <img
                  className={styles.single__image}
                  src={data.product.image}
                  alt="name"
                />
                <div className={styles.product_details}>
                  <p className={styles.category}>{data.product.category}</p>
                  <p>
                    <b>{data.product.name}</b>
                  </p>
                  <p>
                    <b>{data.product.shipping}</b>
                  </p>
                </div>
              </div>

              <div className={styles.right_details}>
              <div className={styles.quantityHandler}>
              <button onClick={() => decrementCart(data.product._id)}>-</button>
                <p>{data.quantity}</p>
                <button onClick={() => addtocart(data.product._id)}>+</button>
              </div>
              <div>
                <p className={styles.single__pricetag}>
                  &#8377; {data.product.price  * data.quantity}
                </p>
              </div>

              <div className={styles.single__buttondiv}>
                <button onClick={() => deleteCart(data.product._id)} className={styles.cart__proceedButton}>
                <DeleteIcon/>
                </button>
              </div>
              </div>

            </div>
          ))}
        </div>

        <div className={styles.amt_details}>
          <div>
            <p>SubTotal </p> <span> Rs. {total}</span>
          </div>

          <div>
            <p>Shipping </p> <span>Free</span>
          </div>
          <div>
            <p>Discount </p> <span>0</span>
          </div>
          <hr />
          <div>
            <p>Total </p> <span> Rs. {total}</span>
          </div>
          <div>
            <RouterLink to={"/address"} className={styles.cart__proceedButton}>
              Proced to Checkout
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
