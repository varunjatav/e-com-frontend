import React from 'react'
import Styles from "./Dashboard.module.css"
import { Link, Outlet } from 'react-router-dom'
const Dasboard = () => {
  return (
    <main className={Styles.mainContainer}>
        <aside className={Styles.sideBar}>
          <Link className={Styles.link} to={'addproduct'}>
            ADD PRODUCT
          </Link>
          <Link  to={'product-list'} className={Styles.link}>
            PRODUCT LIST
          </Link>
          <Link to={'users-list'} className={Styles.link}>
            USER LIST
          </Link>
        </aside>
        <section>
          <Outlet/>
        </section>
    </main>
  )
}

export default Dasboard