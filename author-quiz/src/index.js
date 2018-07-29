import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import AddAuthorForm from './AddAuthorForm';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Huckleberry Finn']
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/authors/josephconrad.png',
        imageSource: 'Wikimedia Commons',
        books: ['Heart of Darkness']
    },
    {
        name: 'J.K. Rowling',
        imageUrl: 'images/authors/jkrowling.jpg',
        imageSource: 'Wikimedia Commons',
        imageAttribution: 'Daniel Ogren',
        books: ['Harry Potter and the Sorcerers Stone']
    },
    {
        name: 'Stephen King',
        imageUrl: 'images/authors/stephenking.jpg',
        imageSource: 'Wikimedia Commons',
        imageAttribution: 'Pinguino',
        books: ['The Shining', 'IT']
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['David Copperfield', 'A Tale of Two Cities']
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'images/authors/williamshakespeare.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
    }
];

function getTurnData(authors) {
    const allBooks = authors.reduce((p, c, i) => {
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = _.shuffle(allBooks).slice(0, 4);
    const answer = _.sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find(author => _.some(author.books, title => title === answer))
    };
}

function resetState() {
    return {
        turnData: getTurnData(authors),
        highlight: ''
    };
}

function reducer(state, action) {
    return state;
}

let store = Redux.createStore(reducer);
let state = resetState();

function onAnswerSelected(answer) {
    const isCorrect = _.some(state.turnData.author.books, book => book === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}

function AppWrapper() {
    return (
        <ReactRedux.Provider store={store}>
            <App
                {...state}
                onAnswerSelected={onAnswerSelected}
                onContinue={() => {
                    state = resetState();
                    render();
                }}
            />
        </ReactRedux.Provider>
    );
}

const AuthorWrapper = withRouter(({ history }) => (
    <AddAuthorForm
        onAddAuthor={author => {
            authors.push(author);
            history.push('/');
        }}
    />
));

function render() {
    ReactDOM.render(
        <BrowserRouter>
            <React.Fragment>
                <Route exact path="/" component={AppWrapper} />
                <Route exact path="/add" component={AuthorWrapper} />
            </React.Fragment>
        </BrowserRouter>,
        document.getElementById('root')
    );
}

render();
registerServiceWorker();
