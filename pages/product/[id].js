import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faCartPlus , faHeart, faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import {gql, GraphQLClient} from 'graphql-request';
import React, { useContext } from 'react';
import { GlobalStateContext } from '../_app'
import { toast } from "react-toastify";

function addCart (item, send)  {
  send('ADD_PRODUCT', item);
  toast('Added to cart', { hideProgressBar: true, autoClose: 2000, type: 'success' })
}

export default function ({product}) {
    const {state, send} = useContext(GlobalStateContext);
    return (

     <main className='grid h-screen place-items-center'>
        <section className='full-w lg:flex px-5 py-2 my-10 item-center justify-center'>
            <section className='relative '>
            <Link href="/product" className='hover:bg-slate-900 hover:text-slate-50 rounded-md p-1 mb-3 shadow-xl  transition ease-in-out duration-300'><FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon></Link>
                <Image
                  src={product[0].mainImage.url}
                  alt={product[0].mainImage.alt}                
                  width="400"
                  height="400"
                  className='w-full h-full shadow-xl rounded mt-3'
                />
            </section>
            <section className='space-y-5 p-5'>
                <h4 className='text-xl font-semibold mt-3'>Lorel Ipsm</h4>
                <h1 className="text-6xl font-bold">{product[0].name}</h1>
                <h2 className='text-xl font-bold'>{product[0].price}</h2>
                <h2 className='text-sm max-h-20 overflow-hidden'>
                  {product[0].description.value.document.children.map((item,i) => <p className="max-w-sm font-semibold" key={i}>{item.children[0].value}</p>)}
                </h2>
                <div className='space-y-5'>
                  <div className='flex'>
                    <button><FontAwesomeIcon icon={faMinusCircle}/></button>
                    <input type="text" className='w-10 border border-black mx-2 rounded-lg' />
                    <button><FontAwesomeIcon icon={faPlusCircle}/></button>
                  </div>
                        <div>
                            <button className='w-8 h-8 bg-red-500 rounded-full shadow-xl mx-1 text-white hover:bg-black'>S</button>
                            <button className='w-8 h-8 bg-red-500 rounded-full shadow-xl mx-1 text-white hover:bg-black'>M</button>
                            <button className='w-8 h-8 bg-red-500 rounded-full shadow-xl mx-1 text-white hover:bg-black'>L</button>
                            <button className='w-8 h-8 bg-red-500 rounded-full shadow-xl mx-1 text-white hover:bg-black'>XL</button>
                        </div>
                </div>
                <div  className='space-x-5 flex item-center'>
                    <button    onClick={() => addCart(product[0],send)} className=' border  space-x-2 py-2 px-5 rounded-md text-slate-50 bg-slate-900 hover:bg-slate-50 hover:text-black'>
                    Add to Cart&nbsp;<FontAwesomeIcon icon={faCartPlus}/>
                    </button>
                    <Link href="checkout" className='rounded-md py-2 px-2 bg-sky-700 text-white'>Checkout now&nbsp; <FontAwesomeIcon icon={faChevronRight}/></Link>
                </div>
            </section>
        </section>
      </main> 
    )
}

const pathQuery = gql`query MyQuery {
    allProducts {
      id
    }
  }
  `

  export async function getStaticPaths() {
    const endpoint = "https://graphql.datocms.com/";
    const graphQLClient = new GraphQLClient(endpoint, {
      headers:{
        "content-type": "application/json",
        authorization: "Bearer 68b7ddb60a206d461192b38297cf8a",
      }
    });
       const pathQry  = await graphQLClient.request(pathQuery);

      const paths =  pathQry.allProducts.map(p=>{ return {params:{id: p.id}}})
    return {
    paths:paths,
      fallback: false, // can also be true or 'blocking'
    }
  }

export async function getStaticProps (context) {

    let endpoint = "https://graphql.datocms.com/";
    let graphQLClient = new GraphQLClient(endpoint, {
     headers:{
       "content-type": "application/json",
       authorization: "Bearer 68b7ddb60a206d461192b38297cf8a",
     }
    });
    const product  = await graphQLClient.request(
      `query MyQuery {
        allProducts (filter: {
            id: { eq: "${context.params.id}" }
          }) {
            id
            name
            price
            description {
              value
            }
            mainImage {
              url
              title
              alt
            }
        }
      }
      `);
    return {
      props:{product: product.allProducts}
    }
 }