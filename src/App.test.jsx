import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import News from './Page/News/News';
import NewsUpdate from 'components/NewsBlock/NewsUpdate';
import App from 'App';
import Layout from 'components/Layout/Layout';
import VisibleWindow from 'components/VisibleWindow/VisibleWindow';
import { Provider } from 'react-redux';
import { store } from 'store';
import ListChat from 'components/ListChat/ListChat';
import axios from 'axios';
import { MemoryRouter, Route, Router, Routes } from 'react-router-dom';
import { resp, responseCommentTest, subTestArr, visibleTestArr } from 'testArray/testArray';
import LaftBlockAllSub from 'components/LeftBlockMain/LeftBlockAllSub';
import ModalWindow from 'components/ModalWindow/ModalWindow';
import CommentAll from 'components/Comment/CommentAll';
import { fetchNewsUnit } from 'Page/News/NewsService';
import userEvent from '@testing-library/user-event';

jest.mock('axios')

describe('TEST Components', ()=>{

  let response:any;
  beforeEach(()=>{
    response=resp
  })

  test('ListChat TEST',async () => {
    localStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkb2dpbkB5YW5kZXgucnUiLCJyb2xlIjoiVVNFUiIsImltZyI6ImRvZ2luQHlhbmRleC5ydS5qcGciLCJuYW1lIjoi0JDQvdC00YDQtdC5INCU0L7Qs9C40L0iLCJpYXQiOjE2NzM2MjQ5OTksImV4cCI6MTY3MzcxMTM5OX0.itvGfnTXfvCnBlNyzNla1LfVwU4tEzS5wYPrPZsPp8I')
    await axios.get.mockReturnValue(response)
    render(<Provider store = {store}><ListChat/></Provider>, {wrapper: MemoryRouter});
    const list = await screen.findAllByTestId('ListChat');
    expect(list.length).toBe(2)
    })

  let responses:any;
  beforeEach(()=>{
    responses = visibleTestArr
  })

  test('VisibleWindow TEST',async () => {
    axios.get.mockReturnValue(responses)
    render(<Provider store = {store}><VisibleWindow visible={true} /></Provider>);
    const user = await screen.findAllByTestId('visble');
    expect(user.length).toBe(3)
    })

    let responseSubs:any = subTestArr
  
    test('LeftSub TEST',async () => {
      axios.get.mockReturnValue(responseSubs)
      render(<Provider store = {store}><LaftBlockAllSub /></Provider>);
      const btn = screen.getByTestId('toggle-btn')
      fireEvent.click(btn)
      const user = await screen.findAllByTestId('subTest');
      
      expect(user.length).toBe(3)
      })  
      
      test('Modal TEST',async () => {
        axios.get.mockReturnValue(responseSubs)
        render(<Provider store = {store}><ModalWindow nameButton='test' /></Provider>);
        const btn = screen.getByTestId('toggle-btn')
        fireEvent.click(btn)
        const modal = screen.getByTestId('modalTest')
        expect(modal).toBeInTheDocument()
        })


      test('CommentAll TEST',async () => {
        axios.get.mockReturnValue(responseCommentTest || '')
        render(<Provider store = {store}><CommentAll comment={responseCommentTest} /></Provider>);
        const btn = screen.getByTestId('toggle-btn')
        fireEvent.click(btn)
        const user = await screen.findAllByTestId('subTest');
        
        expect(user.length).toBe(3)
      })
});