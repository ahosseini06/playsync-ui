import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { getEntities } from "./services/playmaker";
import {Provider} from "react-redux"
import { Suspense } from 'react';

async function App() {
  const tournaments = await getEntities({name: 'tournaments'});
  const t = tournaments.data;
  
  console.log("front end data")
  console.log(t)
  return (
    <ChakraProvider>
      
      <div className="App">
        
          {t && t.map(t => <h1><Suspense>{t.attributes.name}</Suspense></h1>)}
        
        hello world
      </div>
    </ChakraProvider>
  );
}

export default App;
