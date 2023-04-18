import React, {useState, useEffect} from 'react'

const ExperimentsSummary = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch('/api/summary.json', {
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .then(
        (result) => {
            setIsLoaded(true)
            setItems(result)
        },
        (error) => {
            console.log(error)
            console.log('Error state management here.')
        },
        )
    }, [],
    )

    console.log(items)

    if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return <div>Return items here</div>
    }
}


export default ExperimentsSummary