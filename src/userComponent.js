import React, {Component} from 'react';

class User extends Component{
    render(){
        return(
            <div>
                <p>Bienvenido: {this.props.name}</p>
                <img src={this.props.image} alt={this.props.name}></img>
                <br></br><button onClick={this.props.LogOut}>Salir</button>
            </div>
        );
    }
}

export default User;
