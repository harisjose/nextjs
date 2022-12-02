import Link from 'next/link';
import {gql, GraphQLClient} from 'graphql-request';

export default function NavBar({pages}){
    return (
        <nav className="flex items-center justify-between px-6 py-6 lg:px-8">            
            <section className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
                <ul className='flex'>
                {pages.allPages.map((item,i)=><li key={i}><Link className="font-semibold text-slate-900  hover:border-b-2 hover:border-red-800 p-5 pb-2 mr-5 transition ease-in-out  duration-100"  href={item.slug}>{item.title}</Link></li>)}
            </ul>
            </section>
        </nav>
    )
}