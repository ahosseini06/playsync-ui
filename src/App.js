import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { useGetEntitiesQuery } from "./services/playmaker";
import {Provider} from "react-redux"

function App() {
  const {data: t} = useGetEntitiesQuery({name: "tournament", populate:true})
  return (
    <ChakraProvider>
    <div className="App">
      {t && t.data.map(tr => <h4>{tr.attributes.name}</h4>)}
    </div>
    </ChakraProvider>
  );
}

export default App;
