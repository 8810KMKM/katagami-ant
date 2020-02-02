import React from 'react'
import { PieChart, Pie, Cell } from 'recharts'

export default props => {
  const { data } = props
  const fillColors = ['#673AB7', '#00796B', '#9e9e9e']

  return (
    <PieChart
      width={640}
      height={440}
      style={{ fontFamily: 'Koruri', fontSize: 20, fontWeight: 'bold' }}
    >
      <Pie
        data={data}
        dataKey="count"
        nameKey="status"
        outerRadius={160}
        startAngle={90}
        endAngle={-270}
        label={data => data.status + ' : ' + data.count}
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={fillColors[index]} />
        ))}
      </Pie>
    </PieChart>
  )
}
