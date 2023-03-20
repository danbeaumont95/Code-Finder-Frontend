import React from 'react';
import './App.css';
import { connect, ConnectedProps } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Main from './Components/Main';
import Dashboard from './Components/Dashboard';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import FullScreenCodeContainer from './Components/FullScreenCodeContainer';
import LandingPage from './Components/LandingPage';
import FileLoader from './Components/FileLoader';
import DifferenceEditor from './Components/DifferenceEditor';

const mapStateToProps = (state: any) => ({
  current: state.user.currentUser,
});

const connector = connect(
  mapStateToProps,
);

type PropsFromRedux = ConnectedProps<typeof connector>
interface Props extends PropsFromRedux {
  // current: string;
}
function nthIndex(str: string, pat: string, n: number) {
  const L = str.length; let
    i = -1;
  while (n-- && i++ < L) {
    i = str.indexOf(pat, i);
    if (i < 0) break;
  }
  return i;
}

const currentURL = window.location.href;
const letterAfter = currentURL.substring(nthIndex(currentURL, '/', 4) + 1);

function App(props: Props) {
  console.log(props, 'app props');
  return (
    <div className="App">
      <Router>
        {localStorage.getItem('accessToken') ? (
          letterAfter !== '' && letterAfter !== 'http://localhost:3000/' ? (
            <NavBar />
          ) : null
        ) : null}
        <Routes>
          {/* <Route path="/" element={<Main />} /> */}
          <Route path="/login" element={<Main />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/code" element={<FullScreenCodeContainer />} />
          <Route path="/fileloader" element={<FileLoader />} />
          <Route path="/differenceeditor" element={<DifferenceEditor />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>

    </div>
  );
}

export default connector(App);
