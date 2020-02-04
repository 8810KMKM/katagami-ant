import React from 'react'
import PropTypes from 'prop-types'
import { BarChart, XAxis, YAxis, Bar, Cell } from 'recharts'

const ResultGraph = props => {
  const { data, handleSelectUsers, activeIndex, stay } = props

  return (
    <BarChart width={520} height={240} data={data}>
      <XAxis dataKey="label" />
      <YAxis
        allowDecimals={false}
        domain={[0, dataMax => (dataMax ? dataMax : 1)]}
      />
      <Bar dataKey="score" onMouseEnter={handleSelectUsers}>
        {data.map((entry, index) => (
          <Cell
            cursor="pointer"
            key={index}
            fill={stay ? '#9a67ea' : '#007769'}
            stroke={index === activeIndex ? '#004a3f' : ''}
            strokeWidth={index === activeIndex ? 4 : 1}
          />
        ))}
      </Bar>
    </BarChart>
  )
}

ResultGraph.propTypes = {
  data: PropTypes.array.isRequired,
  handleSelectUsers: PropTypes.func.isRequired,
  activeIndex: PropTypes.number.isRequired,
  stay: PropTypes.bool.isRequired,
}

export default ResultGraph
