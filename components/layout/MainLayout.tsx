import styled from 'styled-components'

const StyledLayout = styled.div`
`

const MainLayout = ({ children }) => {
  return <StyledLayout>{children}</StyledLayout>
}

export default MainLayout
