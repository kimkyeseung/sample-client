import styled from 'styled-components'

const StyledConsole = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
`

const DebugConsole = ({ items }) => {
  return (
    <StyledConsole>
      <h2>디버그 콘솔</h2>
      {items.map((item) => (
        <div key={item.text}>{item.text}</div>
      ))}
    </StyledConsole>
  )
}

export default DebugConsole
