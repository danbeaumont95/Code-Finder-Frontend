import React from 'react';
import { CodeSnippet } from './interfaces';
import { FaJs, FaPython } from 'react-icons/fa';
import CodeMirror from '@uiw/react-codemirror';
// @ts-ignore 
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from 'codemirror';
import { AppDispatch } from '../redux/store';
import { connect, useDispatch, ConnectedProps } from "react-redux";
import { updateCodeSnippet, saveCodeSnippet } from '../redux/User/CodeSnippetsActions'
import swal from 'sweetalert';
import '../Styles/CodeContainer.css';
import NewCodeContainer from './NewCodeContainer';

type PropsFromRedux = ConnectedProps<typeof connector>
interface Props extends PropsFromRedux {
 codeSnippets: CodeSnippet[];
 isDashboard: boolean;
}

const CodeContainer = ({codeSnippets, selectOption, searchText, isDashboard}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const accessToken: any = localStorage.getItem('accessToken');
  const userId: any = localStorage.getItem('userId');

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

  const formatData = (e: CodeSnippet[]) => {
    if (isDashboard) {
      const onlyUser = e.filter((el) => el.user_id === +userId)
      if (selectOption !== '' && selectOption !== undefined && (searchText === '' || searchText === undefined)) {
        const mappedData = onlyUser.filter((el) => el.language.toLowerCase() === selectOption.toLowerCase())
        return mappedData;
      }

      if (searchText !== '' && searchText !== undefined) {
        const mappedData = onlyUser.filter((el: any) => {
          return el.title.toLowerCase().includes(searchText.toLowerCase())
        })
  
        if (selectOption !== '' && selectOption !== undefined) {
          const languageFiltered = mappedData.filter((el) => el.language.toLowerCase() === selectOption.toLowerCase())
          return languageFiltered
        }
  
        return mappedData
      }
      return onlyUser

    }
    if (selectOption !== '' && selectOption !== undefined && (searchText === '' || searchText === undefined)) {
      const mappedData = e.filter((el) => el.language.toLowerCase() === selectOption.toLowerCase())
      return mappedData;
    }
    if (searchText !== '' && searchText !== undefined) {
      const mappedData = e.filter((el: any) => {
        return el.title.toLowerCase().includes(searchText.toLowerCase())
      })

      if (selectOption !== '' && selectOption !== undefined) {
        const languageFiltered = mappedData.filter((el) => el.language.toLowerCase() === selectOption.toLowerCase())
        return languageFiltered
      }

      return mappedData
    }
    return e;
  }

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

  const onChange = React.useCallback((value: any, id: any) => {
    dispatch(updateCodeSnippet(value, id))
  }, [dispatch]);
    
  return (
    <div className='code_container_code_snippets_container' >
      <NewCodeContainer data={formatData(codeSnippets)} codeSnippets={codeSnippets}/>
        {formatData(codeSnippets).map((el) => (
          <div className='code_snippet_container'>
            
            <div className='code_snippet_title_container' >
              <i className='code_snippet_language_icon'>{getIcon(el.language)}</i>
              <h4 className='code_snippet_title'>{el.title}</h4>
            </div>
            
            <CodeMirror
              theme={'dark'}
              value={el.code}
              height="200px"
              extensions={[javascript({ jsx: true }),EditorView.lineWrapping,]}
              onChange={(e) => onChange(e, el.id)}
              style={{textAlign: 'left', marginTop: '20px'}}
              id={el.id.toString()}
              editable={isDashboard || el.user_id === +userId}
            />

            <div className='code_snippet_button_container'>
              <button className='login_here_button' onClick={handleSaveCodeSnippet} id={el.id.toString()}>Save</button>
            </div>

          </div>
        ))}
        </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    searchText: state.search.searchText,
    selectOption: state.search.selectOption,
  };
};

const connector = connect(
  mapStateToProps,
)

export default connector(CodeContainer);
