import '../Styles/CustomTooltip.css';
import React, { useState } from 'react';

function CustomToolip(props: any) {
  const {
    isError, children, direction, content,
  } = props;
  const [active, setActive] = useState(false);

  const showTip = () => {
    setActive(true);
  };

  const hideTip = () => {
    setActive(false);
  };

  return (
    <div
      className={isError ? 'Tooltip-Wrapper' : undefined}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <div className={`Tooltip-Tip ${direction || 'top'}`}>
          {content}
        </div>
      )}
    </div>
  );
}

export default CustomToolip;
