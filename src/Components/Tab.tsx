import { useState, useEffect } from "react";
import { FaJs, FaPython, FaJava, FaRust } from 'react-icons/fa';
import { backwardsLanguageLookup, languageLookup } from "../Constants/languageOptions";
import { changeTitleToFileType } from "../helpers/helper";
import '../Styles/Tab.css';

const Tab = (props: any) => {
  const { tabTitle, setTabTitle } = props;

  const [titleEnterPressed, handleTitleEnterPressed] = useState(false)

  const handleTitleChange = (e: any) => {

    handleTitleEnterPressed(false)

    const { target: { value } } = e;

    setTabTitle(value)
    props.setTitle(value)
  }


  const handleTitleKeyDown = (e: any) => {

    if (e.key === 'Enter') {

      handleTitleEnterPressed(true)
    }
  }

  const getIcon = (language: string) => {

    if (!language) {
      return <></>
    }
    const replaced = backwardsLanguageLookup[language]

    switch(replaced.toLowerCase()) {
      case 'Javascript'.toLowerCase():
        return <FaJs style={{ color: '#754484'}} size={20}/>
      case 'Python'.toLowerCase():
        return <FaPython style={{ color: '#754484'}} size={20}/>
      case 'Java'.toLowerCase():
        return <FaJava style={{ color: '#754484'}} size={20}/>
      case 'Rust'.toLowerCase():
        return <FaRust style={{ color: '#754484'}} size={20}/>
      default:
        return <h4>Dan</h4>
    }

  }

  return (
    <div className="tab_container">
    {tabTitle ? (

    <i className='modal_content_card_language_icon'>{getIcon(languageLookup[changeTitleToFileType(tabTitle)])}</i>
    ) : null}
      <input value={tabTitle} id='title' className="full_screen_code_container_right_nav_input" type="text" placeholder="title..." onChange={handleTitleChange} style={{color: 'white'}} onKeyDown={handleTitleKeyDown}/>
    </div>

  )
}

export default Tab;
