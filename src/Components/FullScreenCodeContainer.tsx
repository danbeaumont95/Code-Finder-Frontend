import Editor, { useMonaco } from "@monaco-editor/react";
import '../Styles/FullScreenCodeContainer.css';
import { useRef, useState } from "react";
import axios from "axios";
import { languageOptions } from "../Constants/languageOptions";
import OutputWindow from "./OutputWindow";
import OutputDetails from "./OutputDetails";
import Modal from 'react-modal';
import { FaJs, FaPython, FaJava, FaRust, FaFile, FaSearch, FaCog, FaTrash } from 'react-icons/fa';
import {  useDispatch } from "react-redux";
import { AppDispatch } from '../redux/store';
import Tab from "./Tab";
import SideBarFiles from "./SideBar_Files";
import SideBarDelete from "./SideBar_Delete";
import SideBarSettings from "./SideBar_Settings";
import SideBarSearch from "./SideBar_Search";
import useKey from "../Hooks/UseKey";
import swal from "sweetalert";
import { createCodeSnippet, setCodeSnippets } from "../redux/User/CodeSnippetsActions";

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '400px',
    width: '400px',
    backgroundColor: '#1E1E1E',
  },

};

const FullScreenCodeContainer = () => {
  const monaco = useMonaco();
  const monacoObjects = useRef<any>(null);
  const dispatch: AppDispatch = useDispatch();

  const editorRef = useRef<any>(null);
  const [tabTitle, setTabTitle] = useState('')
  const [modalIsOpen, setIsOpen] = useState(true);
  const [language, setLanguage] = useState<string>('javascript');
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('')
  const [codeIsPublic, setCodeIsPublic] = useState<boolean>(true)
  const [outputDetails, setOutputDetails] = useState(null);
  const [titleEnterPressed, handleTitleEnterPressed] = useState(false)
  const [showIcon, setShowIcon] = useState(false);
  const [expandSidebar, setExpandSidebar] = useState(false)
  const [currentSidebarItem, setcurrentSidebarItem] = useState('');
  const accessToken: any = localStorage.getItem('accessToken');
  const userId: any = localStorage.getItem('userId');

  let subtitle: any;

  const editorOptions: any= {
    fontSize: 15,
    minimap: {
      enabled: false,
    },
    backgroundColor: 'black',

  };

  const highlightWords = (event: any) => {

    const editorModel= monaco?.editor.getModels()[0];

    const matches = editorModel?.findMatches(event, false, false, false, null, false);

    matches?.forEach((match): void => {

      editorModel?.deltaDecorations([], [
        {
          range: match.range,
          options: {
            isWholeLine: false,
            inlineClassName: 'test_class_name'
          }
        }
      ]);
    });

  }

  function setEditorTheme(monaco: any) {
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    monaco.editor.defineTheme('onedark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        {
          token: 'comment',
          foreground: '#5d7988',
          fontStyle: 'italic',
          minimap: { enabled: false },
        },
        { token: 'constant', foreground: '#e06c75' }
      ],
      colors: {
        'editor.background': '#21252b',
        // 'editor.hoverHighlightBackground': '#00FF00',
        // 'editor.wordHighlightBackground': '#00FF00',
        // 'editor.wordHighlightStrongBackground': '#00FF00',
        'editor.wordHighlightStrongBackground': '#754484', // working

        // "editor.foreground": "#000000",
        // "editor.background": "#EDF9FA",
        // "editorCursor.foreground": "#8B0000",
        // "editor.lineHighlightBackground": "#0000FF20",
        // "editorLineNumber.foreground": "#754484",
        // "editor.selectionBackground": "pink",
        // "editor.inactiveSelectionBackground": "white",
        // 'editorSuggestWidget.selectedBackground': '#FFC0CB',
        // 'editorLineNumber.activeForeground': '#754484' // working
        'editorLineNumber.activeForeground': '#af8eb9'
      },

    })
  }

  const options = [
    { value: '', label: '' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: 'Rust', label: 'Rust' }
  ]

  const handleCodeChange = (e: any) => {
    setCode(e)
  }

  const checkStatus = async (token: string) => {
    const options = {
      method: "GET",
      // url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      url: 'https://judge0-ce.p.rapidapi.com/submissions' + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        // "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Host": 'judge0-ce.p.rapidapi.com',
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);

      let statusId = response.data.status?.id;


      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setOutputDetails(response.data);
        return;
      }
    } catch (err) {
      console.error("err", err);
      // setProcessing(false);
      // showErrorToast();
    }
  };

  const handleCompile = (e: any) => {
    const languageId = languageOptions.filter((el) => el.name.includes(language));

    const formData = {
      // language_id: language.id,
      // language_id: languageId[0],
      language_id: 63,
      // encode source code in base64
      source_code: btoa(code),
      // stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      // url: process.env.REACT_APP_RAPID_API_URL,
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        // "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Host": 'judge0-ce.p.rapidapi.com',
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,

      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response: any) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err: any) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;

        if (status === 429) {
          console.error("too many requests", status);

          // showErrorToast(
          //   `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
          //   10000
          // );
        }
        // setProcessing(false);
        console.error("catch block...", error);
      });
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const getIcon = (language: string) => {

    switch(language.toLowerCase()) {
      case 'Javascript'.toLowerCase():
        return <FaJs style={{ color: '#754484'}} size={50}/>
      case 'Python'.toLowerCase():
        return <FaPython style={{ color: '#754484'}} size={50}/>
      case 'Java'.toLowerCase():
        return <FaJava style={{ color: '#754484'}} size={50}/>
      case 'Rust'.toLowerCase():
        return <FaRust style={{ color: '#754484'}} size={50}/>
      default:
        return <h4>Dan</h4>
    }

  }

  const handleCardClick = (e: any, option: {label: string; value: string}) => {
    const { label: language } = option;
    setLanguage(language.toLowerCase())
    setIsOpen(false)
  }

 const handleSaveClicked = (e: any) => {

  if (!title) swal("Error", 'Unable to save, please add title and try again!', "error")
  if (!language) swal("Error", 'Unable to save, please add language and try again!', "error")
  if (!code) swal("Error", 'Unable to save, please add code and try again!', "error")

  dispatch(createCodeSnippet(accessToken, {title, code,  language, 'user_id': userId, 'public': codeIsPublic}))
  .then((res) => {

    if (res === 'Success') {
      swal('Success', "Code snippet created!", "success")
      dispatch(setCodeSnippets(accessToken))
    }
    if (res.Error) {
      swal("Error", res.Error, "error")

    }
    else {
      swal("Error", 'Unable to create code snippet, please try again later!', "error")
    }
  })
  .catch(() => {
    swal("Error", 'Unable to create code snippet, please try again later!', "error")
  })
 }
 
//  useKey("Enter", handleSubmit)
 useKey('ctrls', () => console.log('Ctrl+S fired!'));
 useKey('ctrls',  handleSaveClicked);

 console.log(navigator.appVersion, 'navigator.appVersion12')

  const handleSidebarIconClick = ( type: string) => {
    if (!expandSidebar ) {
      setExpandSidebar(currentExpanded => !currentExpanded)
      setcurrentSidebarItem(type)
    }
    else if (expandSidebar&& currentSidebarItem === type) {
      setcurrentSidebarItem('')
      setExpandSidebar(false)

    }
    else {
      setcurrentSidebarItem(type)
      setExpandSidebar(true)
    }
  }

  function handleEditorWillMount(monaco: any) {
    // here is the monaco instance
    // do something before editor is mounted
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }

  const handleMount = (editor: any, monaco: any) => {
    editorRef.current = editor; 
    monacoObjects.current = {
      editor,
      monaco,
    };
  }

  return (
    <div id='full_screen_code_container_container' className="full_screen_code_container_container">
      <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      >
      <div className="modal_content">
      <h4 className="modal_content_title">Select from a template...</h4>
      <div className="modal_content_card_container">
        {options.filter((el) => el.label.length).map((el) => (
          <div className="modal_content_card" onClick={(e) => handleCardClick(e, el)}>
            <div className="modal_content_card_body">

            <i className='modal_content_card_language_icon'>{getIcon(el.label)}</i>
            <h4 className="modal_content_card_title">{el.label}</h4>

            </div>


          </div>
        ))}

      </div>
      </div>

      </Modal>
      <div className={expandSidebar ? "full_screen_code_container_left_sidebar_expanded" : "full_screen_code_container_left" }>
      <div className="sidebar_icon_container">
      <i className="sidebar_icon" onClick={() => handleSidebarIconClick('file')}><FaFile style={{ color: currentSidebarItem === 'file' ? 'rgb(107 21 134)' : '#754484'}} size={ 25}/></i>
      </div>
      <div className="sidebar_icon_container">
      <i className="sidebar_icon" onClick={() => handleSidebarIconClick('search')}><FaSearch style={{ color: currentSidebarItem === 'search' ? 'rgb(107 21 134)' : '#754484'}} size={ 25}/></i>
      </div>
      <div className="sidebar_icon_container">

      <i className="sidebar_icon" onClick={() => handleSidebarIconClick('settings')}><FaCog style={{  color: currentSidebarItem === 'settings' ? 'rgb(107 21 134)' : '#754484'}} size={25}/></i>

      </div>
      <div className="sidebar_icon_container">

      <i className="sidebar_icon" onClick={() => handleSidebarIconClick('trash')}><FaTrash style={{  color: currentSidebarItem === 'trash' ? 'rgb(107 21 134)' : '#754484'}} size={25}/></i>
      </div>
 
      </div>
      {expandSidebar ? (
        
      <div className="full_screen_code_container_sidebar">
        <h3 className="full_screen_code_container_sidebar_title">{currentSidebarItem ?? null}</h3>
        {currentSidebarItem === 'search' ? (
          <SideBarSearch highlightWords={highlightWords}/>
        ) : currentSidebarItem === 'settings' ? (
          <SideBarSettings codeIsPublic={codeIsPublic} setCodeIsPublic={setCodeIsPublic}/>
        ) : currentSidebarItem === 'file' ? (
          <SideBarFiles  tabTitle={tabTitle} setTabTitle={setTabTitle}/>
        ) : null}
      <div>

      </div>
      <div></div>
      </div>
      ) : null}
      <div className="full_screen_code_container_right">
        <div className="full_screen_code_container_right_nav">
          <Tab title={title} setTitle={setTitle}language={language} tabTitle={tabTitle} setTabTitle={setTabTitle}/>

          <button className="compile_button" onClick={handleCompile}>Compile</button>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
        <div className="full_screen_code_container_section">
        <div className="full_screen_code_container_section_code_container">

        <Editor 
          height="100vh"
          width={`65vw`}
          language={language}
          value={''}
          // theme={"vs-dark"}
          theme={"onedark"}
          defaultValue="// some comment"
          className="editor_class"
          beforeMount={setEditorTheme}
          options={editorOptions}
          onChange={handleCodeChange}
          onMount={handleMount}
          // beforeMount={handleEditorWillMount}
          
        />
        </div>
        <div className="full_screen_code_container_section_output">
        <h4>hi</h4>
        <OutputWindow outputDetails={outputDetails} />
        </div>
        </div>

      </div>
    </div>
  )
};

export default FullScreenCodeContainer;
