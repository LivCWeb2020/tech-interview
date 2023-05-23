import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function Graph({ data }) {
    const graphRef = useRef()

    useEffect(() => {
        if (data) {
            drawGraph()
        }
    }, [data])

    const drawGraph = () => {
        const margin = { top: 50, right: 80, bottom: 50, left: 70 }
        const width = 600 - margin.left - margin.right
        const height = 300 - margin.top - margin.bottom

        // Group the data
        const groupedData = d3.group(data, d => d.group_name)

        // Process the data into d3 format
        const processedData = Array.from(groupedData, ([group, items]) => ({
            group,
            values: items.map(d => d.value),
            avg: d3.mean(items, d => d.value),
            min: d3.min(items, d => d.value),
            max: d3.max(items, d => d.value)
        }))

        // Create the svg element and append to the DOM
        const svg = d3
            .select(graphRef.current)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)

        // Create the x and y scales using the processed data
        const x = d3
            .scaleBand()
            .domain(processedData.map(d => d.group))
            .range([0, width])
            .paddingInner(0.5)
            .paddingOuter(1.5)

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(processedData, d => d.max)])
            .range([height, 0])

        // Create the color scale
        const color = d3
            .scaleOrdinal()
            .domain(processedData.map(d => d.group))
            .range(['#8794ea', '#bbc9f6'])

        // Remove the defaul x-axis labels
        svg
            .append('g')
            .attr('transform', `translate(0, ${height})`)
            .attr('stroke-width', '0.5px')
            .call(d3.axisBottom(x).tickFormat(''))

        svg.append('g').attr('stroke-width', '0.5px').call(d3.axisLeft(y))

        // Add new x-axis label
        svg
            .append('text')
            .attr('x', width / 2)
            .attr('y', height + margin.bottom - 10)
            .style('font-size', '13px')
            .style('fill', '#8a8f99')
            .style('text-anchor', 'middle')
            .style('font-weight', '600')
            .text('IFNg')

        // Add y-axis label
        svg
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', -margin.left)
            .attr('x', -height / 2)
            .attr('dy', '1em')
            .style('fill', '#8a8f99')
            .style('font-weight', 'bold')
            .style('text-anchor', 'middle')
            .text('Expression')

        // Add graph title
        svg
            .append('text')
            .attr('x', width / 2)
            .attr('y', -margin.top / 2)
            .attr('text-anchor', 'middle')
            .style('fill', '#8a8f99')
            .style('font-size', '14px')
            .style('font-weight', '600')
            .text('IFNg')

        //   Add bars to the graph
        svg
            .selectAll('.bar')
            .data(processedData)
            .join('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.group)) // Use the x axis to position the bars
            .attr('y', d => y(d.avg)) // Use the y axis to position the bars
            .attr('width', x.bandwidth()) // Set the bar width
            .attr('height', d => height - y(d.avg)) // Set the bar height
            .attr('fill', d => color(d.group))
            .attr('rx', 5)
            .attr('ry', 5)

        //   Create a const mid line for each group to show the variance
        const groups = svg
            .selectAll('g.group')
            .data(processedData)
            .enter()
            .append('g')
            .attr('class', 'group')
            .attr('transform', d => `translate(${x(d.group) + x.bandwidth() / 2}, 0)`)

        // Create a ball for each value in the group
        groups
            .selectAll('circle.ball')
            .data(d => d.values)
            .enter()
            .append('circle')
            .attr('class', 'ball')
            .attr('cx', 0) // All the balls are centered at the same x position
            .attr('cy', d => y(d)) // Use the y scale to position the balls
            .attr('r', 3) // Give the balls a radius of 3
            .attr('stroke', '#a4b9f3')
            .attr('fill', 'white')

        // Create a line for each group to show the variance
        svg
            .selectAll('.variance-line')
            .data(processedData)
            .join('line')
            .attr('class', 'variance-line')
            .attr('x1', d => x(d.group) + x.bandwidth() / 2)
            .attr('y1', d => y(d.min))
            .attr('x2', d => x(d.group) + x.bandwidth() / 2)
            .attr('y2', d => y(d.max))
            .attr('stroke', '#4e4e4e')
            .attr('stroke-width', 1.5)

        // Create a horizontal line to show the min
        svg
            .selectAll('.horizontal-line-min')
            .data(processedData)
            .join('line')
            .attr('class', 'horizontal-line-min')
            .attr('x1', d => x(d.group) + x.bandwidth() / 2 - 10)
            .attr('y1', d => y(d.min))
            .attr('x2', d => x(d.group) + x.bandwidth() / 2 + 10)
            .attr('y2', d => y(d.min))
            .attr('stroke', '#4e4e4e')
            .attr('stroke-width', 1.5)

        // Create a horizontal line to show the max
        svg
            .selectAll('.horizontal-line-max')
            .data(processedData)
            .join('line')
            .attr('class', 'horizontal-line-max')
            .attr('x1', d => x(d.group) + x.bandwidth() / 2 - 10)
            .attr('y1', d => y(d.max))
            .attr('x2', d => x(d.group) + x.bandwidth() / 2 + 10)
            .attr('y2', d => y(d.max))
            .attr('stroke', '#4e4e4e')
            .attr('stroke-width', 1.5)

        // Create a legend to show the groups and colors
        svg
            .append('g')
            .attr(
                'transform',
                `translate(${width + margin.right - 200}, ${margin.top})`
            )
            .selectAll('.legend')
            .data(processedData)
            .join('g')
            .attr('class', 'legend')
            .attr('font-size', '12')
            .attr('transform', (d, i) => `translate(0, ${i * 20})`)
            .call(g =>
                g
                    .append('rect')
                    .attr('width', 18)
                    .attr('height', 18)
                    .attr('fill', d => color(d.group))
            )
            .call(g =>
                g
                    .append('text')
                    .attr('x', 25)
                    .attr('y', 9)
                    .attr('dy', '0.35em')
                    .text(d => d.group)
            )
    }

    return (
        <div style={{ padding: '10px' }} ref={graphRef}>
            {/* The graph will be rendered inside this div */}
        </div>
    )
}

export default Graph