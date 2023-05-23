import React, { useState, useEffect } from 'react';
import Graph from './Graph';
import { Redirect, useParams } from 'react-router-dom';

const ExperimentDetails = () => {
    const { id } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [item, setItem] = useState(localStorage.getItem('item') || {})
    const [tableData, setTableData] = useState(
        localStorage.getItem('tableData') || []
    )
    const [graphData, setGraphData] = useState(null)

    useEffect(() => {
        fetch('/api/detail.json', {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(
                result => {
                    setIsLoaded(true)
                    setItem(result)
                    localStorage.setItem('item', JSON.stringify(result))
                },
                error => {
                    console.log(error)
                    console.log('Error state management here.')
                }
            )
    }, [])

    useEffect(() => {
        fetch('/api/data.json', {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(
                result => {
                    setTableData(result)
                    localStorage.setItem('tableData', JSON.stringify(result))
                },
                error => {
                    console.log(error)
                    console.log('Error state management here.')
                }
            )
    }, [])

    useEffect(() => {
        fetch('/api/plot.json', {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(
                result => {
                    setGraphData(result.items)
                },
                error => {
                    console.log(error)
                    console.log('Error state management here.')
                }
            )
    }, [])

    if (!isLoaded) {
        return <div>Loading...</div>
    } else if (item.uuid && id !== item.uuid) {
        return <Redirect to='/404' />
    } else {
        return (
            <div className='details layout'>
                <div className='details__header'>
                    <h1 className='title'>{item.name}</h1>
                    <p className='short__name'>{item.type?.short_display_name}</p>
                </div>

                {/* Graph */}
                <div className='details__graph'>
                    <Graph data={graphData} />
                </div>

                {/* Table */}
                <table className='details__table'>
                    <thead>
                        <tr>
                            <th>Sample_ID</th>
                            <th>Treatment</th>
                            <th>Dose</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.items?.map(item => {
                            const { Sample_ID, Treatment, Dose } = item
                            return (
                                <tr key={Sample_ID}>
                                    <td>{Sample_ID}</td>
                                    <td>{Treatment}</td>
                                    <td>{Dose}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ExperimentDetails