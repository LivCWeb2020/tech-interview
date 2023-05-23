
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ExperimentsSummary = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  )

  useEffect(() => {
    fetch('/api/summary.json', {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true)
          setItems(result.items)
          localStorage.setItem('items', JSON.stringify(result.items))
        },
        error => {
          console.log(error)
          console.log('Error state management here.')
        }
      )
  }, [])

  if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div className='summary layout'>
        <h1 className='summary__title'>All Experiments</h1>
        <div className='summary__grid'>
          {items.map(item => {
            return (
              <Link
                to={`/experiments/${item.uuid}`}
                key={item.uuid}
                className='summary__card'
              >
                <h2 className='title'>{item.name}</h2>
                <p className='short__name'>{item.type.short_display_name}</p>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }
}

export default ExperimentsSummary