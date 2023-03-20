import React from 'react';
import '../Styles/SideBar_Settings.css';

const SideBarSettings = (props: any) => {
  return (
    <div className="sidebar_settings_container">
      <label htmlFor="input" style={{color: 'white'}}>Public</label>
      <input type="checkbox" checked={props.codeIsPublic} onClick={() => props.setCodeIsPublic((prevCheck: boolean) => !prevCheck)} placeholder="Public" style={{color: 'white'}}/>
    </div>
  )
};

export default SideBarSettings;
