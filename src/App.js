import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { useGetEntitiesQuery } from "./services/playmaker";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import TournamentSelector from './components/tournamentSelector/TournamentSelector';


 function App() {
  const {data: t} = useGetEntitiesQuery({name: 'tournaments', populate: true});
  console.log(t)
  return (
    <ChakraProvider>
      <div className="App"> 
      <Tabs className="nav-bar">
        <TabList>
          <Tab>My Tournaments</Tab>
          <Tab>-</Tab>
          <Tab>-</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
          <div> 
            <TournamentSelector />
          </div>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs> 
      </div>
    </ChakraProvider>
  );
}

export default App;
