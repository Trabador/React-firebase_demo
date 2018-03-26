import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import User from './UserComponent.js';
import PhotoUploader from './PhotoUploaderComponent';
import PhotoDisplayer from './PhotoDisplayerComponent'

class App extends Component {
    constructor(){
        super();
        this.state = {
            user: null,
            photoList: []
        };

        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(firebaseUser =>{
            this.setState({ user: firebaseUser});
        });

        const reference = firebase.database().ref('photos');

        reference.on('value', snapshot =>{
            let objects = snapshot.val();
            if(objects != null){
                this.setState({
                    photoList: Object.values(objects)
                });
            }
            else{
                this.setState({photoList: []});
            }
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
                <div id='content'>
                    <User LogOut={this.handleSignOut}  user={this.state.user}/>
                    <PhotoUploader user={this.state.user}/>
                    <PhotoDisplayer photos={this.state.photoList}/>
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
