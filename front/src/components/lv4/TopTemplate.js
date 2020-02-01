import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useCookies } from 'react-cookie'
import Container from 'components/lv1/Container'
import KatagamiList from 'components/lv3/KatagamiList'
import HeadLine from 'components/lv1/HeadLine'
import Modal from 'components/lv2/Modal'

const TopTemplate = props => {
  const { canRecommend } = props
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['canRecommend'])

  const handleDoRecommendAnnotation = () => {
    window.location.href = 'ant/recommend/2'
  }

  const handleCancelRecommend = () => {
    removeCookie('canRecommend', { path: '/' })
    setModalIsOpen(false)
  }

  return (
    <Container>
      <HeadLine>型紙一覧</HeadLine>
      <KatagamiList {...props} />
      <Modal
        isOpen={modalIsOpen && canRecommend}
        title="オススメの型紙をアノテーションしますか？"
        text="あなたの進捗を確認したうえで, 先にやったほうが良い型紙をチョイスします."
        yesText="はい"
        noText="いいえ"
        handleAnswerYes={handleDoRecommendAnnotation}
        handleAnswerNo={handleCancelRecommend}
      />
    </Container>
  )
}

TopTemplate.propTypes = {
  auth: PropTypes.string.isRequired,
  canRecommend: PropTypes.string,
}

export default TopTemplate
