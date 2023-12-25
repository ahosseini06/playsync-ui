import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { useGetEntitiesQuery } from "./services/playmaker";


 function App() {
  const {data: t} = useGetEntitiesQuery({name: 'tournaments', populate: true});
  console.log(t)
  return (
    <ChakraProvider>
      
      <div className="App">     
          {t && t.data.map(t => <h1>{t.attributes.name}</h1>)}
      </div>
    </ChakraProvider>
  );
}

export default App;
