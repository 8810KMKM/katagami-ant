import React, { useState, useEffect } from 'react'
import { Typography, makeStyles } from '@material-ui/core'
import { AccountBox } from '@material-ui/icons'
import { fetchUser } from 'libs/api'
import { zeroPaddingOf, fixedProdId } from 'libs/format'
import HeadLine from 'components/lv1/HeadLine'
import StatusPieChart from 'components/lv2/StatusPieChart'

const useStyles = makeStyles(theme => ({
  detail: { marginBottom: 40 },
}))

export default props => {
  const { userId, auth } = props
  const [detail, setDetail] = useState({})
  const [isLoading, setIsLoaging] = useState(true)
  const classes = useStyles()

  useEffect(() => {
    const handleGetUser = response => {
      setDetail(response)
      setIsLoaging(false)
    }
    fetchUser({ ...{ auth, userId, handleGetUser } })
  }, [userId, auth])

  if (isLoading) return <Typography>Loading...</Typography>

  return (
    <div>
      <HeadLine
        Icon={<AccountBox fontSize="large" />}
        title={`user - ${zeroPaddingOf(
          process.env.NODE_ENV === 'production'
            ? fixedProdId(detail.id)
            : fixedProdId(detail.id),
          4
        )}`}
      />
      <div className={classes.detail}>
        <Typography variant="h2">登録情報</Typography>
        <Typography>{`メールアドレス : ${detail.email}`}</Typography>
      </div>
      <div className={classes.detail}>
        <Typography variant="h2">アノテーション進捗</Typography>
        <StatusPieChart data={detail.ant_counts} />
      </div>
    </div>
  )
}
