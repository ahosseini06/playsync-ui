import React from 'react'
import { useGetEntitiesQuery } from '../../services/playmaker';

const TournamentSelector = () => {
    const {data: t} = useGetEntitiesQuery({name: 'tournaments', populate: true});   
    console.log(t)
  return (
    <div> {t && t.data.map(tournament => <p>{tournament.attributes.name}</p>)} </div>
  )
}

export default TournamentSelector