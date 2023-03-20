import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import CodeContainer from './CodeContainer';
import { setCodeSnippets } from '../redux/User/CodeSnippetsActions';
import { AppDispatch } from '../redux/store';
import { CodeSnippet } from './interfaces';

function Home({ codeSnippets }: { codeSnippets: CodeSnippet[] }) {
  const dispatch: AppDispatch = useDispatch();
  const accessToken: any = localStorage.getItem('accessToken');

  useEffect(() => {
    dispatch(setCodeSnippets(accessToken));
  }, [accessToken, dispatch]);

  return (
    <div style={{ backgroundColor: '#C9CADF', height: '100vh' }}>
      <h1 style={{ marginTop: '0px', paddingTop: '20px' }}>Home</h1>
      <CodeContainer
        codeSnippets={codeSnippets}
        isDashboard={false}
      />
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  current: state.user.currentUser,
  codeSnippets: state.codeSnippets.codeSnippets,

});

const connector = connect(
  mapStateToProps,
);

export default connector(Home);
