import React from 'react'
import styled from 'styled-components'
import Colors from 'config/Colors'

class LinkButton extends React.Component<IProps> {
  render() {
    return (
      <Button
        key={'createLink'}
        onMouseDown={(evt) => {
          evt.preventDefault()
          document.execCommand(
            'createLink',
            false,
            'https://github.com/lovasoa/react-contenteditable'
          )
        }}
      >
        Link
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

interface IProps {}

export default LinkButton
