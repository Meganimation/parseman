import React from 'react'
import styled from 'styled-components'



const StyledNav = styled.nav<StyledNavType>`
    position: fixed;
    height: 15vh;
    width: 100%;
    opacity: 0.9;   
`

const UnhideComponentItem = styled.span<StyledNavType>`
top: 0;
right: 2rem;
padding-left: 1rem;
`

const UnhideComponentWrapper = styled.div`
position: absolute;
display: flex;
top: 0;
right: 2rem;
`

export default function NavBar(props: INavBarProps) {
    //if logtail is not visible (or any other component), render the show button with a function in a higher order component
    return (
        <StyledNav>
            <UnhideComponentWrapper>
            {(!props.logtailIsVisible && <UnhideComponentItem onClick={()=>{props.showComponent('logtailComponent')}}>X Show Logtail</UnhideComponentItem>)}
            {(!props.templateIsVisible && <UnhideComponentItem onClick={()=>{props.showComponent('templateTable')}}> X Show Template Table</UnhideComponentItem>)}
            {(!props.wordCloudIsVisible && <UnhideComponentItem onClick={()=>{props.showComponent('wordCloud')}}>X Show Word Cloud</UnhideComponentItem>)}
            </UnhideComponentWrapper>
        </StyledNav>
    )
}

type StyledNavType = {

  };

interface INavBarProps {
    showComponent: (nameOfComponents: string) => void;
    logtailIsVisible?: any;
    templateIsVisible: boolean;
    wordCloudIsVisible: boolean;
  }
