import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import User from './UserComponent.js';
import PhotoUploader from './PhotoUploaderComponent';

class App extends Component {
    constructor(){
        super();
        this.state = {
            user: null
        };

        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(user =>{
            this.setState({user: user});
        });
    }

    handleSignIn(){
        const authProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(authProvider)
            .then(result => {console.log(`${result.user.email} se ha logeado`)})
            .catch(error => {console.log(`Error : ${error.message}`)});
    }

    handleSignOut(){
        firebase.auth().signOut()
            .then(result => {console.log(`${this.state.user.displayName} se ha deslogeado`)})
            .catch(error => {console.log(`Error : ${error.message}`)});
    }

    renderLogin(){
        if(this.state.user){
            return (
                <div id='user_data'>
                    <User LogOut={this.handleSignOut} name={this.state.user.displayName} image={this.state.user.photoURL}/>
                    <PhotoUploader />
                </div>
            );
        }
        else{
            return(<button onClick={this.handleSignIn}>Registrate con Google</button>);
        }
    }

  render() {
    return (
      <div className="App">
          <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">The Cosmos</h1>
          </header>
          {this.renderLogin()}
      </div>
    );
  }
}

export default App;
