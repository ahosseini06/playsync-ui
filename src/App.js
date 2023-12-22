import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { useGetEntitiesQuery } from "./services/lastmeal";

function App() {
  const {data: t} = useGetEntitiesQuery
  return (
    <ChakraProvider>
    <div className="App">
      {t.data.map(tr => <h4>{tr.attributes.name}</h4>)}
    </div>
    </ChakraProvider>
  );
}

export default App;
