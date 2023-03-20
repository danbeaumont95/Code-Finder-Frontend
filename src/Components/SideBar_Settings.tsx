/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import '../Styles/SideBar_Settings.css';

function SideBarSettings(props: any) {
  const { codeIsPublic, setCodeIsPublic } = props;
  return (
    <div className="sidebar_settings_container">
      <label htmlFor="input" style={{ color: 'white' }}>Public</label>
      <input type="checkbox" checked={codeIsPublic} onClick={() => setCodeIsPublic((prevCheck: boolean) => !prevCheck)} placeholder="Public" style={{ color: 'white' }} />
    </div>
  );
}

export default SideBarSettings;
