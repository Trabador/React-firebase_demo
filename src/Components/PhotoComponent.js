import React, { Component } from 'react';

class Photo extends Component{

    render(){
        return(
            <div>
                <img src={this.props.imageURL} width='300' alt={this.props.user}/><br/>
                <label>Imagen subida por {this.props.user}</label><br/>
            </div>
        );
    }
} 

export default Photo;