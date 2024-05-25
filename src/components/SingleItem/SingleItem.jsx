import React, { useContext } from 'react'
import styles from "./singleitem.module.css"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../../context/AppContext";


const SingleProduct = (props) => {
    const { _id, image, price, name, shipping, star, category } = props;
    const { addtocart } = useContext(AppContext);
   const navigate = useNavigate()


 const navigatefun = () => {
    navigate(`/product/${_id}`)
 }

const addtowishlist =  async () => {
    // let res = await fetch(`http://localhost:8080/wishlist`, {
    let res = await fetch(`https://blackpearl.onrender.com/wishlist`, {
        method: "POST",
        body: JSON.stringify({ ...props }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

    return (
        <>
            <div key={_id} className={styles.single__maindiv}>
                <img className={styles.single__image} src={image} alt="name" />
                <div className={styles.single__name_heart}>
                <p className={styles.single__pricetag}>&#8377;{" "}{price}</p>
                <p className={styles.single__wishlist} onClick={addtowishlist}><i class="fa-solid fa-heart"></i></p>
                </div>
                <p>{name}</p>
                <div className={styles.single__buttondiv}>
                    <button onClick={() => addtocart(_id)}>Cart</button>
                    <button onClick={navigatefun}>Details</button> 
            </div>
        </div> 
    </>
  )
}

export default SingleProduct;
