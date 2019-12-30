import React, { useState, useEffect } from 'react'
import Container from 'components/lv1/Container'
import { fetchKatagamis } from 'libs/api'
import KatagamiList from 'components/lv3/KatagamiList'
import HeadLine from 'components/lv1/HeadLine'
import { currentUser } from 'libs/auth'

export default function() {
  const [katagamis, setKatagamis] = useState([])
  const [count, setCount] = useState(0)
  const [isLatest, setIsLateset] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handlePaginate = ({ page, per }) => {
    const handleGetKatagamis = response => {
      setKatagamis(response.katagamis)
      setCount(response.count)
      setIsLoading(false)
    }
    setIsLoading(true)
    fetchKatagamis({
      userId: currentUser().id,
      page: page,
      per: per,
      handleGetKatagamis: handleGetKatagamis,
    })
  }

  useEffect(() => {
    setIsLoading(true)
    handlePaginate({ page: 1, per: 5 })
  }, [isLatest])

  if (isLoading) {
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    )
  }

  return (
    <Container>
      <HeadLine>画像一覧</HeadLine>
      <KatagamiList katagamis={katagamis} handlePaginate={handlePaginate} />
    </Container>
  )
}
