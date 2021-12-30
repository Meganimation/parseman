import React from 'react'
import styled from 'styled-components'

const StyledNav = styled.nav`
    position: fixed;
    height: 10vh;
    width: 100%;
    opacity: 0.9;
    
`

export default function NavBar(props: any) {
    //if logtail is not visible (or any other component), render the show button with a function in a higher order component
    return (
        <StyledNav>
            This is the Navbar
            <button onClick={()=>{props.showComponent('replace this with the component to replace')}}></button>
        </StyledNav>
    )
}
