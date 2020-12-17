import React from 'react'
import styled from 'styled-components'
import Colors from 'config/colors'

export enum StyleTypes {
  BOLD,
  ITALIC,
  UNDERLINE,
  STRIKE_THROUGH,
}

class StyleButton extends React.Component<IProps> {
  renderName = (type: StyleTypes) => {
    switch (type) {
      case StyleTypes.BOLD:
        return <BoldIcon>B</BoldIcon>
      case StyleTypes.ITALIC:
        return <ItalicIcon>I</ItalicIcon>
      case StyleTypes.UNDERLINE:
        return <UnderlineIcon>U</UnderlineIcon>
      case StyleTypes.STRIKE_THROUGH:
        return <StrickThroughIcon>S</StrickThroughIcon>
    }
  }

  commandType = (type: StyleTypes) => {
    switch (type) {
      case StyleTypes.BOLD:
        return 'bold'
      case StyleTypes.ITALIC:
        return 'italic'
      case StyleTypes.UNDERLINE:
        return 'underline'
      case StyleTypes.STRIKE_THROUGH:
        return 'strikeThrough'
      default:
        return 'bold'
    }
  }

  render() {
    const { type } = this.props
    const cmd = this.commandType(type)
    const name = this.renderName(type)
    return (
      <Button
        key={cmd}
        onMouseDown={(evt) => {
          evt.preventDefault()
          document.execCommand(cmd, false)
        }}
      >
        {name}
      </Button>
    )
  }
}

const Button = styled.button`
  padding: 10px;
  border-right: 1px solid ${Colors.line};
  cursor: pointer;

  :hover {
    background-color: ${Colors.line};
  }
`

const BoldIcon = styled.span``

const ItalicIcon = styled.span`
  font-style: italic;
`

const UnderlineIcon = styled.span`
  text-decoration: underline;
`

const StrickThroughIcon = styled.span`
  text-decoration: line-through;
`

interface IProps {
  type: StyleTypes
}

export default StyleButton
