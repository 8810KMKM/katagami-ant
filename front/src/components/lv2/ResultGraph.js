import React from 'react'
import { BarChart, XAxis, YAxis, Bar, Cell } from 'recharts'

export default props => {
  const { data, handleSelectUsers, activeIndex } = props

  return (
    <BarChart width={520} height={240} data={data}>
      <XAxis dataKey="label" />
      <YAxis allowDecimals={false} />
      <Bar dataKey="score" onClick={handleSelectUsers}>
        {data.map((entry, index) => (
          <Cell
            cursor="pointer"
            fill={index === activeIndex ? '#007769' : '#9a67ea'}
            key={index}
          />
        ))}
      </Bar>
    </BarChart>
  )
}
