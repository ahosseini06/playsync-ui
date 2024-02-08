import React, { useState } from 'react'
import EventView from '../eventView/EventView'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { IoCloseOutline } from "react-icons/io5";
import './EventDashboard.css'


const EventDashboard = ({tournaments, onCloseEventTab}) => {
  console.log("event dashboard tournaments", tournaments)
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div style={{width: "100%", height: "100vh"}}>
      <h1>
        {tournaments.length>0 ?
     
          <Tabs>
          <TabList>
            {tournaments.map(t => 
            <Tab  _selected={{color: "purple.600", borderColor:"purple.600", bg:"purple.100"}} style={{display: "flex", gap: "1rem"}} key={t.id}>
              
                {t.attributes.name}
              <div className='btn-container'>
                <IoCloseOutline id="close-btn" onClick={()=> onCloseEventTab(t)}/>
              </div>
            </Tab>)}
          </TabList>
        
          <TabPanels>
            {tournaments.map(t => 
            <TabPanel><EventView key={t.id} tournament={t}></EventView></TabPanel>)}
          </TabPanels>
        </Tabs>

        : 
        <div className='no-events'>
          No events selected. Navigate to Manage Events and press view on an Event.
        </div>
        } 
      </h1>
    </div>
  )
}

export default EventDashboard

/* tournaments.map(t => <EventView key={t.id} tournament={t}></EventView>)*/
