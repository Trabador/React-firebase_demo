import React, {Component} from 'react';
import './User.css';

class User extends Component{
    render(){
        return(
            <div className='userContainer'>
                <p className='welcomeText'>Bienvenido: {this.props.user.displayName}</p>
                <img src={this.props.user.photoURL} 
                     alt={this.props.user.displayName}
                     className='avatar'/>
                <br/><button onClick={this.props.logOut} className='logOut'>Salir</button>
            </div>
        );
    }
}

export default User;
