import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "../SingleProduct/Detail.module.css";
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
// import { Badge } from "@chakra-ui/react";
import singleProd1 from "../../assets/singleProd1.png";
import singleProd2 from "../../assets/singleProd2.png";
import singleProd3 from "../../assets/singleProd3.png";
import spriteImage1 from "../../assets/HomeImage/spriteImage2 (1).png";
import spriteImage2 from "../../assets/HomeImage/spriteImage2 (2).png";
import spriteImage3 from "../../assets/HomeImage/spriteImage2 (3).png";
import spriteImage4 from "../../assets/HomeImage/spriteImage2 (4).png";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function Detail() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const { addtocart , addtowishlist } = useContext(AppContext);

  // console.log(id);

  useEffect(() => {
    async function getData() {
      let res = await fetch(`http://localhost:8000/jwellery/${id}`);
      let data = await res.json();
      // console.log(data);
      setData(data);
      // console.log(data);
    }
    getData();
  }, []);



  return (
    <div>
      <div className={styles.containerDetails}>
        <div className={styles.prodImg}>
          <img src={data.image} alt={data.name} />
        </div>
        <div className={styles.prodDetails}>
          <h1>{data.name}</h1>
          <a href="#details">Product Details</a>
          <h3>₹ {data.price}</h3>
          <div className={styles.button}>
            <button onClick={() => addtocart(id)}>
              <FaShoppingCart /> Add To Cart
            </button>
            <button onClick={() =>addtowishlist(id)}>
              {" "}
              <FaRegHeart /> Add To WishList
            </button>
          </div>
          <h5 className={styles.tick}>
            <TiTick />
            Get Delivered With-in a week
          </h5>
        </div>
      </div>
      <div id="details">
        <div className={styles.prodDetails2}>
          <h2>Product Details</h2>
          <div className={styles.prodList}>
            <ul className={styles.list}>
              <li>Width - 8.73 mm</li>
              <li>Height - 8.22 mm</li>
              <li>Purity - 18 KT</li>
              <li>Gross Weight - 4.728 g</li>
              <li>Size - 12 (51.8 mm)</li>
            </ul>
            <ul className={styles.list}>
              <li>
                Set in 18 KT White Gold(4.570 g) with diamonds (0.790 ct ,IJ-SI)
              </li>
            </ul>
            <img
              src="https://assets.cltstatic.com/images/responsive/packaging.jpg"
              alt=""
            />
          </div>
        </div>
        <div className={styles.singleProd}>
          <img src={singleProd1} alt="singleProd1" />
          <img src={singleProd2} alt="singleProd2" />
          <img src={singleProd3} alt="singleProd3" />
        </div>
        <div className={styles.spriteImage}>
          <div>
            <div>
              <img src={spriteImage1} alt="spriteImage1" />
            </div>
            <div>
              <h3>100% Certified & Free Shipping</h3>
              <p>
                Our jewellery always comes with a certificate of authentication.
              </p>
            </div>
          </div>
          <div>
            <div>
              <img src={spriteImage2} alt="spriteImage2" />
            </div>
            <div>
              <h3>15 Day Money-Back</h3>
              <p>Get 100% refund if you don't like your jewellery.</p>
            </div>
          </div>
          <div>
            <div>
              <img src={spriteImage3} alt="spriteImage3" />
            </div>
            <div>
              <h3>Lifetime Exchange</h3>
              <p>Exchange your old designs anytime you want an upgrade.</p>
            </div>
          </div>
          <div>
            <div>
              <img src={spriteImage4} alt="spriteImage4" />
            </div>
            <div>
              <h3>One Year Replacement Warranty</h3>
              <p>If your jewellery has a defect, we will fix it.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
