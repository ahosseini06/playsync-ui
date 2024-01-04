import React, { useEffect, useState } from 'react'
import { useGetEntitiesQuery, useUpdateEntityMutation } from '../../services/playmaker';
import styles from './TournamentSelector.module.css'
import { Button } from '@chakra-ui/react';

const TournamentSelector = ({onEdit}) => {
  // fetch all tournaments
  const {data: t} = useGetEntitiesQuery({name: "tournaments"})

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
    {t && t.data.filter(t => t.attributes.status !== "FINISHED").map(tournament => 
      <div className={styles.tournament}>
        ID:{tournament.id} - NAME: {tournament.attributes.name} - STATUS: {tournament.attributes.status}
        <Button colorScheme='red' onClick={() => onRemove(tournament.id)}>remove</Button>
      </div>)}   
    </div>
  )
}

export default TournamentSelector