import axios from "axios";
import {CodeSnippet, CodeSnippetToCreate} from '../Components/interfaces'
const getCodeSnippets = async (token: string) => {
  const codeSnippets = await axios.get('http://127.0.0.1:8000/codefinder/code', {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return codeSnippets;
}

const saveCodeSnippet = async (token: string, code: CodeSnippet) => {
  const codeSnippet = await axios.put('http://127.0.0.1:8000/codefinder/code', {codeSnippet: code} , {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return codeSnippet
}

const createCodeSnippet = async (token: string, code: CodeSnippetToCreate) => {
  console.log(code, 'code123')
  const newSnippet = await axios.post('http://127.0.0.1:8000/codefinder/code', code, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return newSnippet;
}

const CodeSnippetsService = {
  getCodeSnippets,
  saveCodeSnippet,
  createCodeSnippet
}

export default CodeSnippetsService;
