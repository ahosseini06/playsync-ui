import React, { useEffect, useState } from 'react'
import { useGetEntitiesByRelationQuery, useUpdateEntityMutation } from '../../services/playmaker';
import styles from './TournamentSelector.module.css'
import { Button } from '@chakra-ui/react';

const TournamentSelector =  ({tournaments, onEdit, setShow}) => {
  // fetch all tournaments that belong to user

  // remving a tournament
  const [updateEntity] = useUpdateEntityMutation();
  const onRemove = (id) => {
    updateEntity({name: "tournaments", id: id, body: {data:{status: "FINISHED"}}});
    // reload window 
    window.location.reload();
  }

  return (
    <div> 
      {/* filter out tournaments that are finished, map remaining tournaments to an information row with button options*/}
    
    </div>
  )
}

export default TournamentSelector