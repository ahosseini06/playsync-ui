import React from 'react'

const EventView = ({tournament}) => {
  return (
    <div>
        <h1>
            {tournament.attributes.name}
        </h1>
    </div>
  )
}

export default EventView