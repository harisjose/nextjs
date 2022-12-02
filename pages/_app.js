import '../styles/globals.css'
 // import Font Awesome CSS
 import "@fortawesome/fontawesome-svg-core/styles.css";
 import { config } from "@fortawesome/fontawesome-svg-core";
 import Layout from './layout';
 import React, { createContext } from 'react';
 import {shoppingMachine} from '../machines/shoppingMachine'
import { useMachine } from '@xstate/react';
 config.autoAddCss = false;

 export const GlobalStateContext = createContext({});

function MyApp({ Component, pageProps }) {
  const [state,send] = useMachine(shoppingMachine,{});
  return( 
  
      <GlobalStateContext.Provider value={{ state, send }}>
        <Layout>
        <Component {...pageProps} />
        </Layout>
      </GlobalStateContext.Provider>  
  )
}

export default MyApp
