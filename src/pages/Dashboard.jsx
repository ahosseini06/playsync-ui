import React, { useEffect, useState } from 'react'
import "./styles/Dashboard.css"
import { Button, ChakraProvider, background, useDisclosure } from '@chakra-ui/react'
import { useGetEntitiesByRelationQuery, useGetEntitiesQuery, useGetUserEntitiesQuery } from "../services/playmaker";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import TournamentSelector from '../components/tournamentSelector/TournamentSelector';
import NoEvents from '../components/noEvents/NoEvents';
import { useAsync } from "react-async"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react'
import CreateEvent from '../components/createEvent/CreateEvent.jsx';
import { getUserInfo } from '../services/AuthReq.js';

const Dashboard = () => {
  // check if user is logged in
  if(!localStorage.getItem("user")){
    console.log("USER AUTH FAILED")
    window.location.href = "/login"
  }
  const {data: tournaments} = useGetEntitiesQuery({name: "tournaments", populate: true})
  
  // modal functions  
  const { isOpen, onOpen, onClose } = useDisclosure();

  
  return (
    <>
    <head>
    <style>
@import url('https://fonts.googleapis.com/css2?family=Alumni+Sans:wght@100;200;300;400;500;600&family=Inter:wght@200;300;400;500;600;900&family=Oswald:wght@200;300;400&display=swap');
    </style>
    </head>
    <div>
        <div className="App"> 
     
      <Tabs className="nav-bar" colorScheme='purple'>
        <TabList style={{backgroundColor: "#E6E1F0"}}>
          <Tab>Manage Events</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
          <div> 
            {tournaments && tournaments.data.filter(t => t.attributes.status !== "FINISHED").length === 0? <NoEvents onBtnClick={onOpen}></NoEvents>: <TournamentSelector onEdit={()=>null} tournaments={tournaments}/>}
            <TournamentSelector onEdit={()=>null}/>
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
    </div>
    </>
  )
}

export default Dashboard