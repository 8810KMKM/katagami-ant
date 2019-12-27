import React, { useState, useEffect } from 'react'
import Container from 'components/lv1/Container'
import { fetchKatagamis } from 'libs/api'
import KatagamiList from 'components/lv3/KatagamiList'
import HeadLine from 'components/lv1/HeadLine'
import { currentUser } from 'libs/auth'

export default function() {
  const [katagamis, setKatagamis] = useState([])
  const [isLatest, setIsLateset] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handlePagenate = page => {
    const handleGetKatagamis = katagamis => {
      console.log(katagamis)
      setKatagamis(katagamis)
      setIsLoading(false)
    }
    setIsLoading(true)
    fetchKatagamis({
      userId: currentUser().id,
      page: page,
      handleGetKatagamis: handleGetKatagamis,
    })
  }

  useEffect(() => {
    setIsLoading(true)
    handlePagenate(1)
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
      <KatagamiList katagamis={katagamis} />
    </Container>
  )
}
