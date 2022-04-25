import React, { useState, useRef } from "react";
import Portal from "./Portal";
import styled from "styled-components";

//video to follow: https://www.youtube.com/watch?v=bnuw7pqWUGA&t=3601s
interface TooltipProps {
  ref: any, 
  posRef: any,
  show: number,
  backgroundColor?: any,
  textColor?: any,
  darkMode?: boolean,
  children?: any,
  tooltipComponent?: any,
}

const StyledToolTip = styled.span`
  position: fixed;
  top: ${(props: TooltipProps) => props.posRef.current.y}px;
  left: ${(props: TooltipProps) => props.posRef.current.x}px;
  font-size: 20px;
  background-color: ${(props: TooltipProps) => props.backgroundColor};
  color: ${(props: TooltipProps) => props.textColor};
  pointer-events: none;
  padding: 10px;
  border-radius: 5px;
  z-index: 99999;
  display: inline-block;
  white-space: nowrap;
  opacity: ${(props: TooltipProps) => props.show};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
`;

const getPoint = (el:any, tt:any, placement:any, space:any) => {
  const pt = { x: 0, y: 0 };
  const elRect = el.getBoundingClientRect();

  switch (placement) {
    case "left":
      pt.x = elRect.left - (tt.offsetWidth + space);
      pt.y = elRect.top + el.offsetHeight - tt.offsetHeight / 2;
      break;
      case "right":
        pt.x = elRect.right + space;
        pt.y = elRect.top + el.offsetHeight - tt.offsetHeight / 2;
        break;
        case "top":
          pt.x = elRect.left + (el.offsetWidth - tt.offsetWidth) / 2;
          pt.y = elRect.top - (tt.offsetHeight + space);
          break;
    case "bottom":
    default:
      pt.x = elRect.left + (el.offsetWidth - tt.offsetWidth) / 2;
      pt.y = elRect.bottom + space;
  }

  return pt;
};

function TooltipStuff({
  tooltipComponent = <div>hey</div>,
  darkMode = true, 
  placement = "bottom",
  space = 15,
  backgroundColor = "white",
  textColor = "black",
  children = <button>hover over me</button>,
  ...props
}) {
  const handleMOver = (e: any) => {
    setShow(1);
    posRef.current = getPoint(
      e.currentTarget,
      tooltipRef.current,
      placement,
      space
    );
  };
  const handleMOut = () => setShow(0);

  const [show, setShow] = useState(0);
  const posRef = useRef({ x: 0, y: 0 });
  const tooltipRef = useRef();

  return (
    <>
      {React.cloneElement(children, {
        onMouseOver: handleMOver,
        onMouseOut: handleMOut,
      })}
      <Portal>
        <StyledToolTip ref={tooltipRef} posRef={posRef} show={show} backgroundColor={backgroundColor} textColor={textColor} darkMode={darkMode}>
          <div>{tooltipComponent}</div>
        </StyledToolTip>
      </Portal>
    </>
  );
}

export default TooltipStuff;
