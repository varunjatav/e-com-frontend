import React, { useContext } from "react";
import styles from "./Cart.module.css";
import wishlist from "../../assets/wishlist.png";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext";


const Cart = () => {
  const [status, setStatus] = useState(false);
  const [datas, setDatas] = useState([]);
  const [total, setTotal] = useState(0);
  const {currentUser } = useContext(AppContext);
  
  const deleteCart = async (id) => {
    // let res = await fetch(`http://localhost:8080/cart/${id}`, {
    let res = await fetch(`https://blackpearl.onrender.com/cart/${id}`, {
      method: "Delete",
    });
    setStatus(!status);
  };

  function getTotal(data) {
    let totalam = 0;
    for (let i = 0; i < data.length; i++) {
      totalam += data[i].product.price;
    }
    setTotal(totalam);
    localStorage.setItem("totalAmount",totalam)
  }

  useEffect(() => {
    async function getCart() {
      // let res = await fetch("http://localhost:8080/cart");
      let res = await fetch("http://localhost:8000/cart/",{
        method: "GET",
          headers:{
            "content-type": "application/json",
            "Authorization": `Bearer ${currentUser}`
          }
        
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      let data1 = await res.json();
      console.log(data1);
      setDatas(data1.items);
      await getTotal(data1.items);
    }

    getCart();
  }, [currentUser]);
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
         <div key={data.id} className={styles.single__maindiv}>
           <img className={styles.single__image} src={data.product.image} alt="name" />

           <p className={styles.single__pricetag}>&#8377; {data.product.price}</p>

           <p className={styles.single__nametag}>{data.name}</p>
           <div className={styles.single__buttondiv}>
             <button onClick={() => deleteCart(data.id)}>
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
