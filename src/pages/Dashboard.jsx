import React, { useEffect, useState } from 'react'
import "./styles/Dashboard.css"
import { useDisclosure } from '@chakra-ui/react'
import {  useGetEntitiesQuery } from "../services/playmaker";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import TournamentSelector from '../components/tournamentSelector/TournamentSelector';
import NoEvents from '../components/noEvents/NoEvents';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react'
import CreateEvent from '../components/createEvent/CreateEvent.jsx';
import { Button } from 'react-bootstrap';


const Dashboard = () => {
  
  // check if user is logged in
  if(!localStorage.getItem("user")){
    console.log("USER AUTH FAILED")
    window.location.href = "/login"
  }
  const {data: tournaments} = useGetEntitiesQuery({name: "tournaments", populate: true})
  console.log("tournaments", tournaments)

  const [display, setDisplay] = useState(tournaments)
  const [selectedFilter, setSelectedFilter] = useState(localStorage.getItem("filter")? localStorage.getItem("filter") : "ALL")
  
  useEffect(() => {
    if(tournaments){
      if(selectedFilter === "ALL"){
        setDisplay(tournaments)
      } else if(selectedFilter === "SCHEDULED"){
        setDisplay({data: tournaments.data.filter(t => t.attributes.status === "PRE-EVENT")})
      } else if(selectedFilter === "ACTIVE"){
        setDisplay({data: tournaments.data.filter(t => t.attributes.status !== "FINISHED" && t.attributes.status !== "PRE-EVENT")})
      } else if(selectedFilter === "COMPLETE"){
        setDisplay({data: tournaments.data.filter(t => t.attributes.status === "FINISHED")} )
      }
    }
  }, [selectedFilter, display, tournaments])

  // modal functions  
  const { isOpen, onOpen, onClose } = useDisclosure();

  const swtichFilters = (filter) => {
    setSelectedFilter(filter);
    localStorage.setItem("filter", filter);
  }
  
  return (
    <>
    <div>
      <div className="App">   
      <Tabs className="nav-bar" colorScheme='purple'>
        <TabList style={{backgroundColor: "#E6E1F0"}}>
          <Tab>Manage Events</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
          <div className='tab-page'> 
            {tournaments && tournaments.data.filter(t => t.attributes.status !== "FINISHED").length === 0
            ? 
            <NoEvents onBtnClick={onOpen}></NoEvents>
            : 
            <div className='list-container'>
              <div className='filter-switcher'>
                <button 
                  className={`filter${selectedFilter==='ALL'? '-selected' : ""}`} 
                  onClick={() => swtichFilters('ALL')}
                  
                >All</button>
                <button 
                  className={`filter${selectedFilter==='SCHEDULED'? '-selected': ""}`} 
                  onClick={() => swtichFilters('SCHEDULED')}
                  
                >Scheduled</button>
                <button 
                  className={`filter${selectedFilter==='ACTIVE'? '-selected': ""}`} 
                  onClick={() => swtichFilters('ACTIVE')}
                  
                >Active</button>

                <button 
                  className={`filter${selectedFilter==='COMPLETE'? '-selected': ""}`} 
                  onClick={() => swtichFilters('COMPLETE')}
                  
                >Complete</button>
                <div class="breaker"></div>
              </div>

              <TournamentSelector onEdit={()=>null} tournaments={display}/>
              <button className="btn-sized" onClick={onOpen}>+</button>
            </div>
            }
          </div>

          {/*modal*/}
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
    </div>
    </>
  )
}

export default Dashboard