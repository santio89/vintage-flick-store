import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Item from './Item'
import '../../src/styles/css/ItemList.css';
import PuffLoader from "react-spinners/PuffLoader";

export default function ItemList({ productos, searchId, loading, sortOpen, setSortOpen, sortLow, sortHigh, sortRelevance, sortActive, setSortActive }) {

    /*price calculado con una formula a partir de las propiedades de 'community have' y 'community want' (que vienen de la api) */

    const { categoryId } = useParams();
    const [isProductos, setIsProductos] = useState(false);
    
    const history = useNavigate();

    useEffect(() => {
        productos.length > 0 ? setIsProductos(true) : setIsProductos(false);

    }, [productos])

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);



    return (
        <>
            <AnimatePresence>
                <motion.div transition={{ type: 'spring', duration: .8 }} initial={{ opacity: 0, transform: "translateX(-120%)" }}
                    animate={{ opacity: 1, transform: "translateX(0%)" }}
                    exit={{ opacity: 0, transform: "translateX(120%)" }} key="ItemList__title__search" className='ItemList__title'>

                    {
                        searchId ? <div>BUSCANDO: {searchId.replace(/\+/g, " ").toUpperCase()}</div> : (categoryId ? (<div>VIENDO: <select defaultValue={categoryId} onChange={(e) => { history(`../categories/${e.target.value.replace(/\s/g, "+")}`) }}>
                            <option value={"categories"} disabled>CATEGORIAS</option>
                            <option value={"rock"}>ROCK</option>
                            <option value={"pop"}>POP</option>
                            <option value={"blues"}>BLUES</option>
                            <option value={"jazz"}>JAZZ</option>
                            <option value={"hip+hop"}>HIP HOP</option>
                            <option value={"reggae"}>REGGAE</option>
                            <option value={"electronic"}>ELECTRONIC</option>
                            <option value={"country"}>COUNTRY</option>
                            <option value={"classical"}>CLASSICAL</option>
                            <option value={"funk"}>FUNK</option>
                            <option value={"latin"}>LATIN</option>
                            <option value={"folk"}>FOLK</option>
                        </select></div>) : <div>MÁS VISTOS</div>)
                    }
                </motion.div>

            </AnimatePresence>

            <div className="ItemListWrapper">
                {
                    loading ? (<PuffLoader color={"var(--color-one)"} loading={loading} size={200} speedMultiplier={1.2} />) :
                        <AnimatePresence>
                            <motion.div transition={{ type: 'tween', duration: .4, ease: "easeInOut" }} key="ItemList" className="ItemList"
                                initial={{ opacity: 0, transform: "translateX(-120%)" }}
                                animate={{ opacity: 1, transform: "translateX(0%)" }}
                                exit={{ opacity: 0, transform: "translateX(120%)" }}>

                                {isProductos ? <div className="ItemList__contentWrapper"> 
                                    <div className="ItemList__sortWrapper">
                                        <button className={`ItemList__sort ${sortOpen?"is-active":""}`} onClick={()=>setSortOpen((sortOpen)=>!sortOpen)}>Ordenar&nbsp;<i className="bi bi-caret-down-fill"></i></button>
                                        <div className={`ItemList__sortOptions ${sortOpen?"is-visible":""}`}>
                                            <button className={`ItemList__sortOptions__lowest ${sortActive==="low"?"is-active":null}`} onClick={()=>{sortLow(); setSortActive("low")}}>Menor Precio</button>
                                            <button className={`ItemList__sortOptions__highest ${sortActive==="high"?"is-active":null}`} onClick={()=>{sortHigh(); setSortActive("high")}}>Mayor Precio</button>
                                            <button className={`ItemList__sortOptions__relevance ${sortActive==="relevance"?"is-active":null}`} onClick={()=>{sortRelevance(); setSortActive("relevance")}}>Relevancia</button>
                                        </div>
                                    </div>
                                    
                                    <div className="ItemList__content">
                                        {productos.map((producto) => {
                                            return (
                                                <Item key={producto?.id} id={producto?.id} title={producto?.artists_sort?(`${producto?.artists_sort} - ${producto?.title}`):producto?.title} img={producto?.cover_image || producto?.images?.[0]?.resource_url} price={producto?.price} />
                                            )
                                        })}
                                    </div>
                                </div> : <div className="ItemList__noProducts">No se encontraron resultados... <Link className="ItemList__noProducts__link" to="/">Ir al inicio?</Link></div>}
                                
                            </motion.div>
                        </AnimatePresence>
                }

            </div>
        </>
    )
}