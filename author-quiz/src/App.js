import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
    static propTypes = {
        title: PropTypes.string.isRequired,
        onClick: PropTypes.func
    };

    render() {
        return (
            <div onClick={() => this.props.onClick(this.props.title)} className="answer">
                <h4>{this.props.title}</h4>
            </div>
        );
    }
}

class Turn extends Component {
    static propTypes = {
        highlight: PropTypes.string,
        author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            imageUrl: PropTypes.string.isRequired,
            imageSource: PropTypes.string.isRequired,
            books: PropTypes.arrayOf(PropTypes.string).isRequired
        }),
        books: PropTypes.arrayOf(PropTypes.string).isRequired,
        onAnswerSelected: PropTypes.func
    };

    highlightToBgColor(highlight) {
        const mapping = {
            none: '',
            correct: 'green',
            wrong: 'red'
        };
        return mapping[highlight];
    }

    render() {
        return (
            <div
                className="row turn"
                style={{ backgroundColor: this.highlightToBgColor(this.props.highlight) }}
            >
                <div className="col-4 offset-1">
                    <img src={this.props.author.imageUrl} className="authorimage" alt="Author" />
                </div>
                <div className="col-6">
                    {this.props.books.map(title => (
                        <Book title={title} key={title} onClick={this.props.onAnswerSelected} />
                    ))}
                </div>
            </div>
        );
    }
}

class Continue extends Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
        onContinue: PropTypes.func
    };
    render() {
        return (
            <div className="row continue">
                {this.props.show ? (
                    <div className="col-11">
                        <button
                            className="btn btn-primary btn-lg float-right"
                            onClick={this.props.onContinue}
                        >
                            Continue
                        </button>
                    </div>
                ) : null}
            </div>
        );
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

function mapStateToProps(state) {
    return {
        turnData: state.turnData,
        highlight: state.highlight
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onAnswerSelected: answer => {
            dispatch({ type: 'ANSWER_SELECTED', answer });
        },
        onContinue: () => {
            dispatch({ type: 'CONTINUE' });
        }
    };
}

class App extends Component {
    static propTypes = {
        highlight: PropTypes.string,
        turnData: PropTypes.object,
        onAnswerSelected: PropTypes.func,
        onContinue: PropTypes.func
    };

    render() {
        return (
            <div className="container-fluid">
                <Hero />
                <Turn
                    {...this.props.turnData}
                    highlight={this.props.highlight}
                    onAnswerSelected={this.props.onAnswerSelected}
                />
                <Continue
                    show={this.props.highlight === 'correct'}
                    onContinue={this.props.onContinue}
                />
                <p>
                    <Link to="/add">Add an author</Link>
                </p>
                <Footer />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
