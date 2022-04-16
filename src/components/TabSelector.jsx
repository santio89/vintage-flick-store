/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from 'react-router-dom'
import '../../src/styles/css/TabSelector.css';

export default function TabSelector(){

    return(
        <div className="tabs is-medium">
            <ul className="is-size-5">
                <li ><NavLink to="/" onClick={()=>window.scrollTo(0,0)} className={({isActive})=>isActive?"is-active":""}>Más Vistos</NavLink></li>
                <li ><NavLink to="/categories" onClick={()=>window.scrollTo(0,0)} className={({isActive})=>isActive?"is-active":""}>Categorías</NavLink></li>
            </ul>
        </div>
    )
}