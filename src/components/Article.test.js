import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';

const mockArticle = {
    createdOn: 'Thu, Jan 27th 2022',
    headline: 'This is a headline',
    author: 'This is the author'
}

test('renders component without errors', ()=> {
    render(<Article article={mockArticle}/>)
});

test('renders headline, author from the article when passed in through props', ()=> {
    render(<Article article={mockArticle}/>)
    const headline = screen.queryByText(/This is a headline/i)
    const author = screen.queryByText(/This is the author/i)
    expect(headline).toBeInTheDocument()
    expect(author).toBeInTheDocument()
});

test('renders "Associated Press" when no author is given', ()=> {
    mockArticle.author = ''
    render(<Article article={mockArticle}/>)
    const assoc = screen.queryByText(/associated press/i)
    expect(assoc).toBeInTheDocument()
});

test('executes handleDelete when the delete button is pressed', ()=> {
    const mockDelete = jest.fn()
    render(<Article article={mockArticle} handleDelete={mockDelete}/>)
    const button = screen.getByTestId("deleteButton") 
    userEvent.click(button)
    expect(mockDelete).toHaveBeenCalled()
});

//Task List: 
//1. Complete all above tests. Create test article data when needed.
{/* <Article key={article.id} article={article} handleDelete={handleDelete} handleEditSelect={handleEditSelect}/> */}