import React, { useContext } from 'react'
import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import  LowerHeader  from './LowerHeader.jsx';
import classes from './Header.module.css'
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider.jsx';
import { auth } from '../../Utility/firebase.js';

const Header = () => {
  const [{user,basket},dispatch]=useContext(DataContext)
  const totalItem=basket?.reduce((amount,item)=>{
    return item.amount+amount
  },0)
    return (
      <>
        <section className={classes.fixed}>
          <div className={classes.header_container}>
            {/* logo */}
            <div className={classes.logo_container}>
              <Link to="/">
                <img
                  src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                  alt="Amazon logo"
                />
              </Link>
              {/* delivery */}
              <div className={classes.delivery}>
                <span>
                  {/* icon */}
                  <SlLocationPin />
                </span>
                <div>
                  <p>Delivering </p>
                  <span>Fort Mill</span>
                </div>
              </div>
            </div>

            <div className={classes.search}>
              {/* search */}
              <select name="" id="">
                <option value="">All</option>
              </select>
              <input type="text" name="" id="" placeholder="search product" />
              {/*  */}
              <BsSearch size={40} />
            </div>

            <div className={classes.order_container}>
              <Link to="" className={classes.language}>
                <img
                  src="https://cdn-icons-png.flaticon.com/256/206/206626.png"
                  alt=""
                />
                <select>
                  <option value="">EN</option>
                </select>
              </Link>

              {/* three components */}
              <Link to={!user && "/auth"}>
                
                  <div>
                    {user ? (
                      <>
                        <p>Hello, {user?.email?.split("@")[0]}</p>
                        <span onClick={()=>auth.signOut()}>Sign out</span>
                      </>
                    ) : (
                      <>
                        <p>Hello,sign in</p>
                        <span>Account & Lists</span>
                      </>
                    )}
                  </div>
                
              </Link>
              {/* orders */}
              <Link to="/orders">
                <p>returns</p>
                <span>&orders</span>
              </Link>
              {/* cart */}
              <Link to="/cart" className={classes.cart}>
                {/* icon */}
                <BiCart size={35} />
                <span>{totalItem}</span>
              </Link>
            </div>
          </div>
        </section>
        <LowerHeader />
      </>
    );
}

export default Header