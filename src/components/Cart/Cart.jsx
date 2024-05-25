import React, { useContext } from "react";
import styles from "./Cart.module.css";
import wishlist from "../../assets/wishlist.png";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext";


const Cart = () => {
  
  
 
  const { datas, total, deleteCart } = useContext(AppContext);
  


console.log(datas);
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
     <div className={styles.wishListDetails}>
       {datas.map((data) => (
         <div key={data.product.id} className={styles.single__maindiv}>
           <img className={styles.single__image} src={data.product.image} alt="name" />

           <p className={styles.single__pricetag}>&#8377; {data.product.price}</p>

           <p className={styles.single__nametag}>{data.name}</p>
           <div className={styles.single__buttondiv}>
             <button onClick={() => deleteCart(data.product._id)}>
               Remove From Cart
             </button>
           </div>
         </div>
       ))}
     </div>
     <div className={styles.single__buttondiv}>

      <RouterLink to={"/address"}> <button className={styles.cart__proceedButton} >Proced to Checkout</button></RouterLink>
    </div>
  </div>
   );
};

export default Cart;
