import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Container from 'components/lv1/Container'
import KatagamiList from 'components/lv3/KatagamiList'
import HeadLine from 'components/lv1/HeadLine'
import Modal from 'components/lv2/Modal'

const TopTemplate = props => {
  const {
    canRecommend,
    handleDoRecommendAnnotation,
    handleCancelRecommend,
  } = props
  const [modalIsOpen, setModalIsOpen] = useState(true)

  const handleCancel = () => {
    handleCancelRecommend()
    setModalIsOpen(false)
  }

  return (
    <Container>
      <HeadLine>型紙一覧</HeadLine>
      <KatagamiList {...props} />
      <Modal
        isOpen={modalIsOpen && canRecommend}
        title="おすすめの型紙をアノテーションしますか？"
        text="あなたの進捗を確認したうえで, 先にやったほうが良い型紙をチョイスします."
        yesText="はい"
        noText="いいえ"
        handleAnswerYes={handleDoRecommendAnnotation}
        handleAnswerNo={handleCancel}
      />
    </Container>
  )
}

TopTemplate.propTypes = {
  auth: PropTypes.string.isRequired,
  canRecommend: PropTypes.string.isRequired,
  handleDoRecommendAnnotation: PropTypes.func.isRequired,
  handleCancelRecommend: PropTypes.func.isRequired,
}

export default TopTemplate
