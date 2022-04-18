import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext();

export default function CartContextProvider({children}) {

    const [carrito, setCarrito] = useState([]);
    const [cartItems, setCartItems] = useState(0);
    const [total, setTotal] = useState(0);

    const cartAdd = (item)=>{

      const itemIndex = carrito.findIndex(producto=>producto.item.id === item.id);
      if(itemIndex !== -1){
        const newCart = [...carrito];
        newCart[itemIndex].item.count += item.count;
        setCarrito(newCart);
      } else{
        setCarrito([...carrito, {item}])
      }
    }

    const cartRemove = (id)=>{
      setCarrito(carrito.filter(item=> item.item.id !== id));
     
    }

    const cartClear = ()=>{
      setCarrito([]);
    }

    useEffect(()=>{
      setCartItems(carrito.reduce((total, item)=>total+=item.item.count, 0));
      
      setTotal(carrito.reduce((total, item)=>total+=item?.item?.precio * item?.item?.count, 0));
    }, [carrito])

  return (
    <>
       <CartContext.Provider value={{carrito, cartItems, total, cartClear, cartAdd, cartRemove}}>
            {children}
       </CartContext.Provider>
    </>
  )
}
