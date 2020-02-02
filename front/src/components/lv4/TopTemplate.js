import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { PhotoLibrary } from '@material-ui/icons'
import Container from 'components/lv1/Container'
import HeadLine from 'components/lv1/HeadLine'
import Modal from 'components/lv2/Modal'
import KatagamiList from 'components/lv3/KatagamiList'

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
      <HeadLine Icon={<PhotoLibrary fontSize="large" />} title="型紙一覧" />
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
  canRecommend: PropTypes.bool.isRequired,
  handleDoRecommendAnnotation: PropTypes.func.isRequired,
  handleCancelRecommend: PropTypes.func.isRequired,
}

export default TopTemplate
