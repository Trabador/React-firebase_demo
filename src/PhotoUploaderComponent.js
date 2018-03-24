import React, {Component} from 'react';
import firebase from 'firebase';

class PhotoUploader extends Component{
    constructor(){
        super();
        this.state = {
            uploadProgress: 0,
            imageURL: null,
            uploading: false
        };

        this.renderProgressBar = this.renderProgressBar.bind(this);
        this.handleUploadPhoto = this.handleUploadPhoto.bind(this);
    }

    renderProgressBar(){
        if(this.state.uploading){
            return(
                <div>
                    Subiendo Archivo
                    <progress value={this.state.uploadProgress} max='100'></progress>
                </div>
            );
        }
    }

    handleUploadPhoto(event){
        console.log(event.target.files);
        const photoFile = event.target.files[0]; //get the file to upload
        const reference = firebase.storage().ref(`/shared_photos/${photoFile.name}`);
        const task = reference.put(photoFile);

        task.on('state_changed', snapshot => {
            let percentage = ((snapshot.bytesTransferred/snapshot.totalBytes)*100);
            this.setState({uploadProgress: percentage, uploading: true});
            this.render();
        }, error => {
            console.log(error.message);
        },() => {
            this.setState({uploading: false,
                                  imageURL: task.snapshot.downloadURL});
        });
        //const photoFile = event.
    }

    render(){
        return(
            <div>
                <div>
                    <label > Elige una imagen para subir </label>
                    <input type='file' id='photoFile' onChange={this.handleUploadPhoto}></input>
                    {this.renderProgressBar()}
                </div>
                <div>
                    <img src={this.state.imageURL} width='300' alt=''/>
                </div>
            </div>
        );
    }
}

export default PhotoUploader;
