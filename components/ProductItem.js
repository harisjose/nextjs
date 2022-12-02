import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faCartPlus} from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { GlobalStateContext } from '../pages/_app'
import { toast } from "react-toastify";

function addCart (item,send) {
  debugger;
  send('ADD_PRODUCT', item);
  toast('Item added to cart', { hideProgressBar: true, autoClose: 2000, type: 'success' })
}
export default function ProductItem({product}) {
  const {state, send} = useContext(GlobalStateContext);
    return (
    <section>
        
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-white xl:aspect-w-7 xl:aspect-h-8">
          <Link key={product.id} href={`product/${product.id}`} className="group"><Image
            src={product.mainImage.url}
            alt={product.mainImage.alt}
            className="h-full w-full object-cover object-center shadow-xl hover:translate-y-5 hover:bg-red-800 hover:text-slate-50 transition ease-in-out  duration-300"
            width="400"
            height="400"
          /></Link>
        </div>
        <div className='flex justify-between'>
          <div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
          </div>  
          <div><button className='p-1 my-3 rounded-md border-gray-900 border hover:bg-black hover:text-white' onClick={() => addCart(product,send)}>Add to Cart&nbsp;<FontAwesomeIcon icon={faCartPlus}/></button>
          <Link href={`product/${product.id}`} className='p-2 my-3 mx-2 rounded-md border-gray-900 border hover:bg-black hover:text-white'>&nbsp;<FontAwesomeIcon icon={faArrowCircleRight}/></Link></div>

        </div>
    </section>
    )
}