import React, {Component} from 'react';

class PhotoDisplayer extends Component{
    render(){
        return(
            <div>
                {this.props.photos.map((photo, i) =>(
                    <li key = {i}>
                        <div>
                            <img src={photo.photoURL} width='300' alt={photo.user.userName}/><br/>
                            <label>Imagen subida por</label><br/>
                            {photo.user.userName}
                        </div>
                    </li>
                )
                ).reverse()}
            </div>
        );
    }
}

export default PhotoDisplayer;
