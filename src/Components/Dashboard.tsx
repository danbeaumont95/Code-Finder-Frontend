import React, { useEffect } from 'react';
// import CodeMirror from '@uiw/react-codemirror';
// // @ts-ignore 
// import { javascript } from '@codemirror/lang-javascript';
// import { EditorView } from 'codemirror';
import { connect, useDispatch } from "react-redux";
import { AppDispatch } from '../redux/store';
import { setCodeSnippets } from '../redux/User/CodeSnippetsActions'
import { CodeSnippet } from './interfaces';
import '../Styles/Dashboard.css';
// import swal from 'sweetalert';
// import { FaJs, FaPython } from 'react-icons/fa';
import CreateNewContainer from './CreateNewContainer';
import CodeContainer from './CodeContainer';

const Dashboard = ( { codeSnippets}: { codeSnippets: CodeSnippet[]; } ) => {
  const dispatch: AppDispatch = useDispatch();
  const accessToken: any = localStorage.getItem('accessToken');

  useEffect(() => {
      dispatch(setCodeSnippets(accessToken))
  }, [accessToken, dispatch])

 // color: 'rgb(103 160 199)'
  return (
    <div className='dashboard_container'>
      <h1 className='dashboard_title'>Dashboard</h1>
      <CreateNewContainer />
      <CodeContainer 
        codeSnippets={codeSnippets}
        isDashboard={true}
      />
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    codeSnippets: state.codeSnippets.codeSnippets,
    searchText: state.search.searchText,
    selectOption: state.search.selectOption,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  setCodeSnippets: (token: string) => dispatch(setCodeSnippets(token))
})

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(Dashboard);

