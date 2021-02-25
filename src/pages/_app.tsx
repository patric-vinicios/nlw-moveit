import '../styles/global.css';
import {ChallegensProvider, ChallengesContext} from '../context/ChallengesContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
 

  return(
   
    <ChallegensProvider>
        <Component {...pageProps} />
    </ChallegensProvider>
   
  )
 
}

export default MyApp
