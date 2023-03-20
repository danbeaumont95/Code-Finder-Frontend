import Editor from "@monaco-editor/react";
import { CodeSnippet } from "./interfaces";
import '../Styles/NewCodeContainer.css';
import { FaJs, FaPython } from 'react-icons/fa';
import { AppDispatch } from '../redux/store';
import { connect, useDispatch, ConnectedProps } from "react-redux";
import useMonaco from '@monaco-editor/react';
import { updateCodeSnippet, saveCodeSnippet } from '../redux/User/CodeSnippetsActions'
import swal from 'sweetalert';

const NewCodeContainer = ({data, codeSnippets}: {data: CodeSnippet[]; codeSnippets: CodeSnippet[]}) => {
  const dispatch: AppDispatch = useDispatch();
  const accessToken: any = localStorage.getItem('accessToken');
  // const [value, setValue] = useState(code || "");

  // const handleEditorChange = (value) => {
  //   setValue(value);
  //   onChange("code", value);
  // };


  function setEditorTheme(monaco: any) {
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
        'editor.background': '#21252b'
      },

    })
  }

  
  const editorOptions: any= {
    fontSize: 15,
    minimap: {
      enabled: false,
    },
    backgroundColor: 'black'
  };

  const handleSaveCodeSnippet = (e: any) => {
    const { target: { id } } = e;
    const filteredCodeSnippet = codeSnippets.filter((el: CodeSnippet) => el.id === +id);

    dispatch(saveCodeSnippet(accessToken, filteredCodeSnippet[0])).then((res) => {

      const newMessage = res.message
  
      if (newMessage === 'Success') {
        swal('Success', "Code snippet updated!", "success")
      }
      else {
        swal("Error", 'Unable to edit code snippet, please try again later!', "error")
      }
    })
  }

  const getIcon = (language: string) => {

    switch(language.toLowerCase()) {
      case 'Javascript'.toLowerCase():
        return <FaJs style={{ color: '#754484'}} size={30}/>
      case 'Python'.toLowerCase():
        return <FaPython style={{ color: '#754484'}} size={30}/>
      default:
        return <h4>Dan</h4>
    }
  }

  return (
    <div className='code_container_code_snippets_container'>

      {data.map((el) => (
    
        <div className='code_snippet_container'>
            
        <div className='code_snippet_title_container' >
          <i className='code_snippet_language_icon'>{getIcon(el.language)}</i>
          <h4 className='code_snippet_title'>{el.title}</h4>
        </div>
        <Editor 
          height="55vh"
          width={`400px`}
          language={el.language.toLowerCase() || "javascript"}
          value={el.code}
          theme={"vs-dark"}
          defaultValue="// some comment"
          className="editor_class"
          beforeMount={setEditorTheme}
          options={editorOptions}
        />

        <div className='code_snippet_button_container'>
          <button className='login_here_button' onClick={handleSaveCodeSnippet} id={el.id.toString()}>Save</button>
        </div>

      </div>
      ))}
  
    </div>
  )
};

export default NewCodeContainer;
