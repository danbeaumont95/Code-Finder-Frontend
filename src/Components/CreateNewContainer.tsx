import React, { useState } from 'react';
import Modal from 'react-modal';
import CodeMirror from '@uiw/react-codemirror';
// @ts-ignore
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from 'codemirror';
import Select from 'react-select';
import '../Styles/CreateNewContainer.css';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { AppDispatch } from '../redux/store';

import { createCodeSnippet, setCodeSnippets } from '../redux/User/CodeSnippetsActions';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

function CreateNewContainer() {
  const dispatch: AppDispatch = useDispatch();
  const accessToken: any = localStorage.getItem('accessToken');
  const userId: any = localStorage.getItem('userId');

  let subtitle: any;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [codesnippetCode, setCodeSnippetCode] = useState('');
  const [codesnippetTitle, setCodeSnippetTitle] = useState('');
  const [language, setLanguage] = useState('');

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const options = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
  ];

  const colourStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: 'white', width: '200px' }),
    option: (styles: any, {

      // eslint-disable-next-line no-unused-vars
      data, isDisabled, isFocused, isSelected,
    }: any) => ({
      ...styles,
      width: '200px',
      cursor: 'pointer',
    }),
    menu: (styles: any) => ({ ...styles, width: '200px' }),
  };

  const handleCreateNewCodeSnippetChange = React.useCallback((value: any) => {
    setCodeSnippetCode(value);
  }, []);

  const handleTitleChange = React.useCallback((event: any) => {
    const { target: { value } } = event;
    setCodeSnippetTitle(value);
  }, []);

  const handleCodeLanguageChange = (e: any) => {
    setLanguage(e.value);
  };

  const handleSaveCodeSnippet = () => {
    dispatch(createCodeSnippet(accessToken, {
      title: codesnippetTitle, code: codesnippetCode, language, user_id: userId, public: true,
    }))
      .then((res) => {
        if (res === 'Success') {
          swal('Success', 'Code snippet created!', 'success');
          dispatch(setCodeSnippets(accessToken));
        } else {
          swal('Error', 'Unable to create code snippet, please try again later!', 'error');
        }
      })
      .catch(() => {
        swal('Error', 'Unable to create code snippet, please try again later!', 'error');
      });
  };

  return (
    <div>
      <button type="button" onClick={openModal} className="code_snippet_create_new">Create new</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{ width: '800px', height: '500px' }}>
          <input type="text" placeholder="Title..." style={{ color: '#0E6EAF', fontSize: 'large', paddingTop: '10px' }} onChange={handleTitleChange} />
          <div style={{ float: 'right' }}>
            <Select options={options} styles={colourStyles} onChange={handleCodeLanguageChange} />
          </div>
          <CodeMirror
            theme="dark"
            value=""
            height="400px"
            extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
            style={{ textAlign: 'left', marginTop: '30px' }}
            onChange={handleCreateNewCodeSnippetChange}
          />
          <button type="button" className="save_new_code_snippet_button" onClick={handleSaveCodeSnippet}>Save</button>
        </div>
      </Modal>
    </div>
  );
}

export default CreateNewContainer;
