import React, {Component} from 'react';
import Photo from './PhotoComponent';

class PhotoDisplayer extends Component{

    constructor(props){
        super(props);
        this.state = {
            photoList: this.props.photos
        };

        this.renderPhotos = this.renderPhotos.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(this.state.photoList !== nextProps.photos){
            this.setState(
                {photoList: nextProps.photos}
            );
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return(this.state.photoList !== nextState.photoList);
    }

    renderPhotos(){
        return(
            this.state.photoList.map((object) => {
                    return(<Photo 
                        key={object.id}
                        user={object.data.user.userName}
                        imageURL={object.data.photoURL}    
                    />)
                }
            ).reverse()
        );
    }


    render(){
        return(
            <div>
                {this.renderPhotos()}
            </div>
        );
    }
}

export default PhotoDisplayer;
