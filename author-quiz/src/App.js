import React, { Component } from 'react';
import './App.css';

class Hero extends Component {
    render() {
        return (
            <div className="row">
                <div className="jumbotron col-10 offset-1">
                    <h1>AuthorQuiz</h1>
                    <p>Select the book written by the author shown</p>
                </div>
            </div>
        );
    }
}

class Book extends Component {
    render() {
        return (
            <div className="answer">
                <h4>{this.props.title}</h4>
            </div>
        );
    }
}

class Turn extends Component {
    render() {
        return (
            <div className="row turn" style={{ backgroundColor: 'white' }}>
                <div className="col-4 offset-1">
                    <img src={this.props.author.imageUrl} className="authorimage" alt="Author" />
                </div>
                <div className="col-6">
                    {this.props.books.map(title => <Book title={title} key={title} />)}
                </div>
            </div>
        );
    }
}

class Continue extends Component {
    render() {
        return <div />;
    }
}

class Footer extends Component {
    render() {
        return (
            <div id="footer" className="row">
                <div className="col-12">
                    <p className="text-muted credit">
                        All Images ar from somewhere in the internet.
                    </p>
                </div>
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div className="container-fluid">
                <Hero />
                <Turn {...this.props.turnData} />
                <Continue />
                <Footer />
            </div>
        );
    }
}

export default App;
