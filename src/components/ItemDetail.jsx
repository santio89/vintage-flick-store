import React, { useEffect, useState } from 'react'
import PuffLoader from "react-spinners/PuffLoader";
import ItemCount from './ItemCount';
import '../../src/styles/css/ItemDetail.css';

export default function ItemDetail({loading, producto, cartAdd}) {
    producto.precio = Math.trunc(Math.abs((producto.community?.have - producto.community?.want) * .8 + 200))
    producto.stockInitial = producto.community?.have;
    console.log(producto.id)

    const initial = 0;
    producto.stockInitial = Math.trunc(producto.stockInitial/40); /* disminuyo el stock solo a modo de que se pueda probar agotar el stock (mas rapidamente) */

    const [stock, setStock] = useState(0);

    useEffect(()=>{
        setStock(producto.stockInitial)
    }, [producto.stockInitial])
 
    
    function onAdd(amount, resetCounter){
        console.log(`ADDED ${amount} TO CART`)
        setStock(stock-amount);
        resetCounter();
        cartAdd(amount);
    }

    function failToAdd(){
        console.log("FAIL TO ADD (NOT ENOUGH STOCK)");
    }


    return (
    <>  
        
        <div className='ItemDetailWrapper'>
        {
            loading?<PuffLoader color={"var(--color-one)"} loading={loading} size={200} speedMultiplier={1.2} />:(
                <div className='ItemDetail'>
                    <div className='ItemDetail__main'>
                        {/* <h2 className='ItemDetail__title'>{producto.title}</h2> */}
                        <div className='ItemDetail__imgWrapper'>
                            <img alt="item" src={producto.cover_image}></img>
                        </div>
                    </div>
                    <div className="ItemDetail__info">
                        <p>◖Artista: {producto.artists_sort}</p>
                        <p>◖Título: {producto.title}</p>
                        <p>◖Categorías: {producto.genres?.join(" - ")}</p>
                        <p>◖Año: {producto.year}</p>
                        <p>◖País: {producto.country}</p>
                        <p>◖Precio: {"$"+producto.precio}</p>
                        <div className='ItemDetail__counterWrapper'>
                        <ItemCount onAdd={onAdd} failToAdd={failToAdd} initial={initial} stock={stock}/>
                        </div>
                    </div>
                </div>
                )}
        </div>
        
    </>
    )
}
