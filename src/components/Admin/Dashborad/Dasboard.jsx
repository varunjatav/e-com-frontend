import React from 'react'
import Styles from "./Dashboard.module.css"
import { Link, Outlet } from 'react-router-dom';
import { MdPostAdd } from "react-icons/md";
import { FaRegListAlt } from "react-icons/fa";
const Dasboard = () => {
  return (
    <main className={Styles.mainContainer}>
        <aside className={Styles.sideBar}>
          <Link className={Styles.link} to={''}>
          <MdPostAdd style={{fontSize:"large"}} /> <h4> ADD PRODUCT</h4>
          </Link>
          <Link  to={'product-list'} className={Styles.link}>
          <FaRegListAlt /> <h4>PRODUCT LIST</h4>
          </Link>
          <Link to={'users-list'} className={Styles.link}>
          <FaRegListAlt /> <h4>USER LIST</h4> 
          </Link>
        </aside>
        <section>
          <Outlet/>
        </section>
    </main>
  )
}

export default Dasboard