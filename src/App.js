import './App.css';
import { Button, ChakraProvider, background, useDisclosure } from '@chakra-ui/react'
import { useGetEntitiesQuery } from "./services/playmaker";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import TournamentSelector from './components/tournamentSelector/TournamentSelector';
import NoEvents from './components/noEvents/NoEvents';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import CreateEvent from './components/createEvent/CreateEvent.jsx';


 function App() {
  // get all tournaments
  const {data: t} = useGetEntitiesQuery({name: 'tournaments', populate: true});
  // modal functions
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider>
      <div className="App"> 
      <head>
      <style>
  @import url('https://fonts.googleapis.com/css2?family=Alumni+Sans:wght@100;200;300;400;500;600&family=Inter:wght@200;300;400;500;600;900&family=Oswald:wght@200;300;400&display=swap');
      </style>
      </head>
      <Tabs className="nav-bar" colorScheme='purple'>
        <TabList style={{backgroundColor: "#E6E1F0"}}>
          <Tab>Manage Events</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
          <div> 
            {t && t.data.filter(t => t.attributes.status !== "FINISHED").length === 0? <NoEvents onBtnClick={onOpen}></NoEvents>: <TournamentSelector />}
          </div>
            <Modal  motionPreset='slideInRight' closeOnOverlayClick={false} isOpen={isOpen} size={"xxl"} onClose={onClose} >
              <ModalOverlay />
              <ModalContent style={{backgroundColor: "#D1C4E9", width:"800px", borderRadius:'25px'}}>
                <ModalHeader className="modal-header"><div className='modal-title'>Create New Event</div></ModalHeader>
                <ModalBody style={{backgroundColor: "#2B1856"}}>
                  <CreateEvent>
                  </CreateEvent>
                </ModalBody>

                <ModalFooter>
                  <div className="m-footer">
                    <button className="btn-secondary" onClick={onClose}>
                      Cancel
                    </button>
                    <button className="btn-primary">
                      Create Event
                    </button>
                  </div>
                </ModalFooter>
              </ModalContent>
            </Modal>

          </TabPanel>
        </TabPanels>
      </Tabs> 
      </div>
    </ChakraProvider>
  );
}

export default App;
