import React from 'react'
import Container from 'components/lv1/Container'
import KatagamiList from 'components/lv3/KatagamiList'
import HeadLine from 'components/lv1/HeadLine'

export default function() {
  return (
    <Container>
      <HeadLine>画像一覧</HeadLine>
      <KatagamiList />
    </Container>
  )
}
