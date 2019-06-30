import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import Input from './Input';
import {getSecretWord} from './actions';

export class UnconnectedApp extends Component {

  componentDidMount() {
    // get the secret word
    this.props.getSecretWord();
  }

  render() {
    return (
      <div className="container">
        <h1>Jotto</h1>
        <Congrats 
          success={this.props.success}
        />
        <Input />
        <GuessedWords 
          guessedWords={this.props.guessedWords}
        />
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    success: state.success,
    guessedWords: state.guessedWords,
    secretWord: state.secretWord
  }
}

export default connect(mapStateToProps, {getSecretWord})(UnconnectedApp);
