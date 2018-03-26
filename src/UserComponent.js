import React, {Component} from 'react';

class User extends Component{
    render(){
        return(
            <div>
                <p>Bienvenido: {this.props.user.displayName}</p>
                <img src={this.props.user.photoURL} alt={this.props.user.displayName}></img>
                <br></br><button onClick={this.props.LogOut}>Salir</button>
            </div>
        );
    }
}

export default User;
