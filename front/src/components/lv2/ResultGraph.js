import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { BarChart, XAxis, YAxis, Bar } from 'recharts'
import { graphDataOf } from 'libs/format'

const useStyles = makeStyles(theme => ({
  root: {
    border: '1px solid',
  },
}))

export default props => {
  const { hasLabels, wholeLabels, position } = props

  const data = graphDataOf(hasLabels, wholeLabels, position)
  const classes = useStyles()

  console.log(data)

  return (
    <BarChart width={520} height={240} data={data}>
      <XAxis dataKey="label" />
      <YAxis allowDecimals={false} />
      <Bar dataKey="score" fill="#00796B" />
    </BarChart>
  )
}
