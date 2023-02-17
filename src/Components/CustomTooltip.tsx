import '../Styles/CustomTooltip.css'
import React, { useState } from "react";

const CustomToolip = (props: any) => {
  const [active, setActive] = useState(false);

  const showTip = () => {
      setActive(true);
  };

  const hideTip = () => {
    setActive(false);
  };

  return (
    <div
      className={props.isError ? "Tooltip-Wrapper" : undefined}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {props.children}
      {active && (
        <div className={`Tooltip-Tip ${props.direction || "top"}`}>
          {props.content}
        </div>
      )}
    </div>
  );
};

export default CustomToolip;
