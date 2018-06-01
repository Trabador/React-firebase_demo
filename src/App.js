import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import { dbConfiguration } from './config';
import User from './Components/UserComponent.js';
import PhotoUploader from './Components/PhotoUploaderComponent';
import PhotoDisplayer from './Components/PhotoDisplayerComponent';

class App extends Component {
    constructor(){
        super();

        // Initialize Firebase
        firebase.initializeApp(dbConfiguration);

        this.state = {
            user: null,
            photoList: []
        };

        this.databaseReference = firebase.database().ref();
        this.photosReference = this.databaseReference.child('photos');

        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
    }

    putRecords = (snapshot) => {
        let record = {data: snapshot.val(), id: snapshot.key};
        this.setState({photoList: this.state.photoList.concat(record)});
    };

    componentWillMount(){
        firebase.auth().onAuthStateChanged(firebaseUser => {
                if(firebaseUser){
                    this.photosReference.on('child_added', this.putRecords);
                }
                else{
                    this.photosReference.off('child_added');
                    this.setState(
                        {photoList: []}
                    );
                }
                this.setState({ user: firebaseUser});
            }
        );
    }

    componentWillUnmount(){
        this.databaseReference.child('photos').off('child_added');
    }

    handleSignIn(){
        const authProvider = new firebase.auth.GoogleAuthProvider();
        authProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
        firebase.auth().signInWithPopup(authProvider)
            .then(result => {console.log(`${result.user.email} se ha logeado`, result)})
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
                <div className='mainContainer'>
                    <div className='userContainer'>
                        <User logOut={this.handleSignOut}  user={this.state.user}/>
                    </div>
                    <div className='photoUploaderContainer'>
                        <PhotoUploader user={this.state.user}/>
                    </div>
                    <div className='displayerContainer'>
                        <PhotoDisplayer photos={this.state.photoList}/>
                    </div>
                </div>
            );
        }
        else{
            return(<button onClick={this.handleSignIn} className='logIn'>Registrate con Google</button>);
        }
    }

  render() {
    console.log(this.state.photoList)
    return (
      <div className="App">
          <header className="App-header">
              <h1 className="App-title">The Cosmos</h1>
          </header>
          {this.renderLogin()}
      </div>
    );
  }
}

export default App;
