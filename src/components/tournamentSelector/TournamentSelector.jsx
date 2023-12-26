import React, { useEffect, useState } from 'react'
import { useGetEntitiesQuery, useUpdateEntityMutation } from '../../services/playmaker';
import styles from './TournamentSelector.module.css'
import { Button } from '@chakra-ui/react';

const TournamentSelector = ({tournaments, onRemove, onEdit}) => {

  return (
    <div> 
    {t && t.data.filter(t => t.attributes.status !== "FINISHED").map(tournament => 
      <div className={styles.tournament}>
        ID:{tournament.id} - NAME: {tournament.attributes.name} - STATUS: {tournament.attributes.status}
        <Button colorScheme='red' onClick={() => onRemove(tournament.id)}>remove</Button>
      </div>)}   
    </div>
  )
}

export default TournamentSelector