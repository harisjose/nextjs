import React, { useContext } from 'react';
import { GlobalStateContext } from '../_app'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faCartShopping, faHeart, faPlusCircle, faMinusCircle, faArrowLeft, faTrash} from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import Link from 'next/link';
import { isTypeSystemDefinitionNode } from 'graphql';
import { toast } from "react-toastify";

function getTotalPrice(items, send) {
    let total = 0;
    debugger;
    items.map(item=>{total = total + item.price});
    return total;
}

function addCart (item,send) {
    send('REMOVE_PRODUCT', item);
    toast('Item removed from your cart', { hideProgressBar: true, autoClose: 2000, type: 'warning' })
}

export default function(){
    const {state, send} = useContext(GlobalStateContext);
    return(
        <main className="grid h-screen place-items-center">
            <article className="lg:flex w-full sm:py-5 mt-20 lg:mt-5 lg:px-20 sm:px-5">
                <section className="sm:w-full lg:w-3/4 bg-white px-10 py-10">
                    <div className="flex justify-between border-b pb-8">
                    <h1 className="font-semibold lg:text-2xl">Shopping Cart</h1>
                    <h2 className="font-semibold lg:text-2xl">{state.context.cart.length} Items</h2>
                    </div>
                    <div className="flex p-5 justify-between">
                        <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                        {/* <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3> */}
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                        {/* <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3> */}
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Remove</h3>
                        
                    </div>
                        {state.context.cart.map((item)=>(
                            <div className="flex justify-between p-5 hover:bg-gray-100">
                            <div className="flex">
                                <div className="w-20">
                                <Image className="h-24" width="300" height="100" src={item.image} alt={item.alt} />
                                </div>
                                <div className="flex flex-col justify-between ml-4 flex-grow">
                                <span className="font-bold text-sm">{item.name}</span>
                                <span className="text-red-500 text-xs">Consid</span>
                                </div>
                            </div>
                            {/* <div className="flex">
                                <FontAwesomeIcon icon={faMinusCircle}/>

                                <input className="mx-2 border text-center w-8 h-6 rounded-md" type="text" value="1" />

                                <FontAwesomeIcon icon={faPlusCircle}/>
                            </div> */}
                            <span className="text-left font-semibold text-sm">{item.price}&nbsp; Kr</span>
                            <button className='text-red-900 text-center content-center'  onClick={() => addCart(item,send)}><FontAwesomeIcon icon={faTrash}/></button>
                            {/* <span className="text-left font-semibold text-sm"></span> */}
                        </div>
                    ))}
                    
                    <Link href="/product" className="flex font-semibold text-indigo-600 text-sm mt-10">
                
                    <FontAwesomeIcon icon={faArrowLeft}/>
                    &nbsp;Continue Shopping
                    </Link>
                </section>

                <section className="lg:w-1/4 sm:w-full  px-8 py-10 ml-5 shadow-xl rounded-xl">
                    <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                    <div className="flex justify-between mt-10 mb-5">
                    <span className="font-semibold text-sm uppercase">{state.context.cart.length}</span>
                    <span className="font-semibold text-sm">{getTotalPrice(state.context.cart)}</span>
                    </div>
                    <div>
                    <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                    <select className="block p-2 text-gray-600 w-full text-sm">
                        <option>Standard shipping - 100.00 Kr</option>
                    </select>
                    </div>
                    <div className="py-10">
                    <label for="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
                    <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full"/>
                    </div>
                    <button className="bg-white text-black rounded-lg border border-gray-900 hover:bg-black hover:text-white px-5 py-2 text-sm text-white uppercase">Apply</button>
                    <div className="border-t mt-8">
                    <div className="flex font-semibold justify-between py-6 text-sm uppercase"> 
                        <span>Total cost</span>
                        <span>{getTotalPrice(state.context.cart) + 100} &nbsp; kr</span>
                    </div>
                    <Link href="success" className="bg-green-800 rounded-md shadow px-5 py-2 font-semibold hover:bg-white hover:text-green-900 hover:border hover:border-green-900 py-3 text-sm text-white uppercase w-full">Buy</Link>
                    </div>
                </section>
            </article>
        </main>
    )
}