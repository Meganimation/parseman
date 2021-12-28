import React from 'react'
import styled from 'styled-components'

const StyledNav = styled.nav`
    position: fixed;
    height: 10vh;
    width: 100%;
    opacity: 0.9;
    
`

export default function NavBar() {
    return (
        <StyledNav>
            This is the Navbar
        </StyledNav>
    )
}
