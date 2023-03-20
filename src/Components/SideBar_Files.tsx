import { backwardsLanguageLookup, languageLookup } from "../Constants/languageOptions";
import { FaJs, FaPython, FaJava, FaRust } from 'react-icons/fa';
import { changeTitleToFileType } from "../helpers/helper";
import '../Styles/SideBar_Files.css';

const SideBarFiles = (props: any) => {
  const { tabTitle } = props;
  const getIcon = (language: string) => {

    if (!language) {
      return <></>
    }

    const replaced = backwardsLanguageLookup[language]

    switch(replaced.toLowerCase()) {
      case 'Javascript'.toLowerCase():
        return <FaJs style={{ color: '#754484'}} size={30}/>
      case 'Python'.toLowerCase():
        return <FaPython style={{ color: '#754484'}} size={30}/>
      case 'Java'.toLowerCase():
        return <FaJava style={{ color: '#754484'}} size={30}/>
      case 'Rust'.toLowerCase():
        return <FaRust style={{ color: '#754484'}} size={30}/>
      default:
        return <h4>Dan</h4>
    }
  }

  return (
    <div className="sidebar_files_container" style={{width: '200px', border: '2px solid blue', height: '50px'}}>
      {tabTitle ? (
        <div>
        <i className="fa_icons" style={{verticalAlign: 'middle'}}>{getIcon(languageLookup[changeTitleToFileType(tabTitle)])}</i>
        <span>{tabTitle}</span>
        </div>
      ) : null}
    </div>
  )
};

export default SideBarFiles;
