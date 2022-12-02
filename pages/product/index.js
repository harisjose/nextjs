import ProductList from '../../components/ProductList';
import Link from 'next/link';
import {gql, GraphQLClient} from 'graphql-request';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
export default function ProductPage({items}){

    return (
        <main className="mx-auto max-w-2xl py-10 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-4 bg-white">
          <Link href="/" className='hover:bg-slate-900 hover:text-slate-50 rounded-md p-1 shadow-xl  transition ease-in-out  duration-300'><FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon></Link>
          <h1 className="'sm:text-xl mt-5 text-4xl font-bold tracking-tight sm:text-center sm:text-4xl text-gray-900 pb-10">CONSID PRODUCTS</h1>
          <ProductList items={items}> </ProductList>
        </main>
    )
}

const qry = gql`query MyQuery {
    allProducts {
      name
      price
      id
      mainImage {
        url
        title
        alt
      }
    }
  }`

export async function getStaticProps () {
    const endpoint = "https://graphql.datocms.com/";
    const graphQLClient = new GraphQLClient(endpoint, {
     headers:{
       "content-type": "application/json",
       authorization: "Bearer 68b7ddb60a206d461192b38297cf8a",
     }
    });
 
    const items  = await graphQLClient.request(qry);
    return {
     props:{items}
    }
 }