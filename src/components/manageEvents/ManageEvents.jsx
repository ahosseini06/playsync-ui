import React, { useEffect, useState } from 'react'
import "./ManageEvents.css"
import { useDisclosure } from '@chakra-ui/react'
import {  useGetEntitiesQuery } from "../../services/playmaker";
import TournamentSelector from '../tournamentSelector/TournamentSelector';
import NoEvents from '../noEvents/NoEvents';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react'
import CreateEvent from '../createEvent/CreateEvent.jsx';


const ManageEvents = ({onView, onEdit, onRemove}) => {

const {data: tournaments} = useGetEntitiesQuery({name: "tournaments", populate: true})
  console.log("tournaments", tournaments)

  const [display, setDisplay] = useState(tournaments)
  const [selectedFilter, setSelectedFilter] = useState(localStorage.getItem("filter")? localStorage.getItem("filter") : "ALL")
   // modal functions  
   const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if(tournaments){
      if(selectedFilter === "ALL"){
        setDisplay(tournaments)
      } else if(selectedFilter === "SCHEDULED"){
        setDisplay({data: tournaments.data.filter(t => t.attributes.status === "scheduled")})
      } else if(selectedFilter === "ACTIVE"){
        setDisplay({data: tournaments.data.filter(t => t.attributes.status === "active")})
      } else if(selectedFilter === "COMPLETE"){
        setDisplay({data: tournaments.data.filter(t => t.attributes.status === "complete")})
      }
    }
  }, [selectedFilter, tournaments])

  const swtichFilters = (filter) => {
      setSelectedFilter(filter);
      localStorage.setItem("filter", filter);
  }

  return (
    <>
    <div className='tab-page' id="manage-events"> 
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

            <TournamentSelector onView={onView} onEdit={()=>null} tournaments={display}/>
            
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
      </>
  )
}

export default ManageEvents