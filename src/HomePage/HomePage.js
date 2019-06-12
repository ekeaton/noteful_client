import React, { Component } from 'react';
import Sidebar from '../SideBar/SideBar';
import MainPage from '../MainPage/MainPage';
import ApiContext from '../ApiContext';


class HomePage extends Component {
    static contextType = ApiContext

    render() {
        let activeFolder = this.props;
        if (this.props.match) {
            activeFolder = this.props.match.params.activeFolderId
        }
        return (
            <div>
                <Sidebar 
                    folders={this.context.folders} 
                    activeFolder={activeFolder}/>
             
                <MainPage 
                activeFolder={activeFolder}
                />        
            </div>
        )
    }
}

export default HomePage; 