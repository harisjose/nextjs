
import {gql, GraphQLClient} from 'graphql-request';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { GlobalStateContext } from './_app';
import React, { useContext } from 'react';
export default function Home({start, nav}) {
   const {state, send} = useContext(GlobalStateContext);
    return (
    <article className="text-gray-900 full-w h-screen justify-center bg-no-repeat bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${start.startpage.mainImage.url})`}}>      
      <header><NavBar pages={nav} key={nav.name}></NavBar></header>
      <section className='m-auto lg:px-40 sm:px-5  relative'>
        <h1 className='text-center text-3xl font-bold tracking-tight sm:text-center sm:text-5xl sm:px-5 uppercase mt-10'>{start.startpage.title}</h1>
        <section className='hidden lg:block'>
        {start.startpage.content.value.document.children.map((item,i) => <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center px-6 lg:px-8" key={i}>{item.children[0].value}</p>)}
        </section>
        <section className="text-center my-10 lg:flex lg:min-w-0 lg:flex-1 lg:justify-center">
          <Link
            href="product"
            tabindex="1"
            className="inline-block rounded-lg bg-transparent px-8 py-3 text-base font-semibold leading-7 text-stone-900 shadow-sm ring-1 ring-red-800 hover:translate-x-3 hover:bg-red-800 hover:text-slate-50 transition ease-in-out  duration-300"
          >
            Start Shopping&nbsp;<FontAwesomeIcon icon={faAngleRight} className=""></FontAwesomeIcon>
          </Link>
        </section>
      </section>
    </article>
  )
}

const queryNav = gql`
    query MyQuery {
      allPages {
        id
        title
        slug
      }
    }
`

const query = gql`
    query MyQuery {
      startpage {
        id
        title
        content {
          value
        }
        mainImage {
          url
          alt
        }
      }
    }
`

export async function getStaticProps () {
  const endpoint = "https://graphql.datocms.com/";
  const graphQLClient = new GraphQLClient(endpoint, {
   headers:{
     "content-type": "application/json",
     authorization: "Bearer 68b7ddb60a206d461192b38297cf8a",
   }
  });

  const start  = await graphQLClient.request(query);
  const nav = await graphQLClient.request(queryNav);
  return {
   props:{start, nav}
  }
}