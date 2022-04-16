/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { Link } from 'react-router-dom'
import '../../src/styles/css/CardWidget.css';



export default function CartWidget({message}){
    const itemsTotal = useContext(CartContext).itemsTotal();
    
    return(
        <Link to="/checkout" onClick={()=>window.scrollTo(0,0)} className="CartWidget" role="button">
            {message?<span><i className="bi bi-cart-fill is-size-3-widescreen is-size-4-desktop is-size-3-touch"></i>&nbsp;{message}</span>:<span><i className="bi bi-cart-fill is-size-3-widescreen is-size-4-desktop is-size-3-touch"></i>&nbsp;{itemsTotal}</span>}
            
            
        </Link>
    )
}