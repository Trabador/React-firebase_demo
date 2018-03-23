import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';

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
            this.setState({
                user: user
            });
        });
    }


    handleSignIn(){
        const authProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(authProvider)
            .then(result => {console.log(`${result.user.email} se ha logeado`)
                                       console.log(result.user)})
            .catch(error => {console.log(`Error : ${error.message}`)});
    }

    handleSignOut(){
        firebase.auth().signOut()
            .then(result => {console.log(`${this.state.user.displayName} se ha deslogeado`)})
            .catch(error => {console.log(`Error : ${error.message}`)});
    }

    renderLogin(){
        if(this.state.user != null){
            return (
                <div>
                    <p>Bienvenido {this.state.user.displayName}</p>
                    <img src={this.state.user.photoURL} alt={this.state.user.displayName}></img>
                    <br></br><button onClick={this.handleSignOut}>Salir</button>
                </div>
            );
        }
        else{
            return(
                <button onClick={this.handleSignIn}>Registrate con Google</button>
            );
        }
    }

  render() {
    return (
      <div className="App">
          <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">The Cosmos</h1>
          </header>
          <p>{this.renderLogin()}</p>
      </div>
    );
  }
}

export default App;
