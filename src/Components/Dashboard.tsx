import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { setCodeSnippets } from '../redux/User/CodeSnippetsActions';
import { CodeSnippet } from './interfaces';
import '../Styles/Dashboard.css';
import CreateNewContainer from './CreateNewContainer';
import CodeContainer from './CodeContainer';

function Dashboard({ codeSnippets }: { codeSnippets: CodeSnippet[]; }) {
  const dispatch: AppDispatch = useDispatch();
  const accessToken: any = localStorage.getItem('accessToken');

  useEffect(() => {
    dispatch(setCodeSnippets(accessToken));
  }, [accessToken, dispatch]);

  return (
    <div className="dashboard_container">
      <h1 className="dashboard_title">Dashboard</h1>
      <CreateNewContainer />
      <CodeContainer
        codeSnippets={codeSnippets}
        isDashboard
      />
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  codeSnippets: state.codeSnippets.codeSnippets,
  searchText: state.search.searchText,
  selectOption: state.search.selectOption,
});

const mapDispatchToProps = (dispatch: any) => ({
  setCodeSnippets: (token: string) => dispatch(setCodeSnippets(token)),
});

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default connector(Dashboard);
