import DebugConsole from 'components/DebugConsole'
import styled from 'styled-components'

const StyledLayout = styled.div``

const MainLayout = ({ debugItems, children }) => {
  return (
    <StyledLayout>
      {children}
      <DebugConsole items={debugItems} />
    </StyledLayout>
  )
}

export default MainLayout
