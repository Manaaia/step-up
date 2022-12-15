import styled from "styled-components"

type FlashMessageProps = {
  shouldShow: boolean,
  message: string
}

const FlashMessage: React.FC<FlashMessageProps> = ({
  shouldShow,
  message,
}) => {
  return (
    <FlashMessageContainer>
      { shouldShow && <p>{ message }</p> }
    </FlashMessageContainer>
  )
}

const FlashMessageContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: green;
  text-align: center;
  color: white;
  width: 25%;
  margin: 10px;
  border-radius: 5px;
`

export default FlashMessage
