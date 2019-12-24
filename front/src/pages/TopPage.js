import React, { useState, useEffect } from 'react'
import Container from 'components/lv1/Container'
import { fetchKatagamis } from 'libs/api'
import KatagamiList from 'components/lv3/KatagamiList'
import HeadLine from 'components/lv1/HeadLine'

export default function() {
  const [katagamis, setKatagamis] = useState([])
  const [isLatest, setIsLateset] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleGetKatagamis = katagamis => {
      setKatagamis(katagamis)
      setIsLoading(false)
    }
    setIsLoading(true)
    fetchKatagamis(handleGetKatagamis)
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
