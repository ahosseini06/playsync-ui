import React, { useEffect, useState } from 'react'
import "./styles/Dashboard.css"
import {getUser} from '../services/AuthReq.js';
import ManageEvents from '../components/manageEvents/ManageEvents.jsx';
import SideBar from '../components/sideBar/SideBar.jsx';
import EventDashboard from '../components/eventDashboard/EventDashboard.jsx';


const Dashboard = () => {

  const [selectedTournaments, setSelectedTournaments] = useState([]);
  
  // check if user is logged in
  async function userLoggedIn(){
    if(!localStorage.getItem("user")){
      console.log("USER AUTH FAILED")
      window.location.href = "/login"
    } else if (await getUser(localStorage.getItem("user"))===false){
      window.location.href = "/login"
    }
  }

  function logout(){
    localStorage.removeItem("user")
    window.location.href = "/login"
  }

  function onViewTournament(tournament){
    setSelectedTournaments([...selectedTournaments, tournament]);
    setTab('event-dashboard')
  }

  const onCloseEventTab = (t)=>{
    //remove t from selectedTournaments
    setSelectedTournaments([...selectedTournaments.filter(tournament => tournament.id !== t.id)])
  }

  useEffect(() => {
    userLoggedIn()
  }, []);

  const [tab, setTab] = useState("manage-events")

  return (
    <>
    <div>
      <div className="App">
        <SideBar tab={tab} setTab={setTab} onLogout={logout}/>

        <div className='tab-page'>
          {tab==="manage-events" && <ManageEvents onView={onViewTournament}/>}
          {tab==="event-dashboard" && <EventDashboard tournaments={selectedTournaments} onCloseEventTab={onCloseEventTab}/>}
        </div>
        
      </div>
    </div>
    </>
  )
}

export default Dashboard