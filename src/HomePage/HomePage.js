import React, { Component } from 'react';
import Sidebar from '../SideBar/SideBar';
import MainPage from '../MainPage/MainPage';
import ApiContext from '../ApiContext';
import NotesError from '../NotesError'
import FolderError from '../FolderError'

class HomePage extends Component {
    static contextType = ApiContext

    render() {
        let activeFolder = this.props;
        if (this.props.match) {
            activeFolder = this.props.match.params.activeFolderId
        }
        return (
            <div>
                <FolderError>
                    <Sidebar 
                        folders={this.context.folders} 
                        activeFolder={activeFolder}/>
                    </FolderError>

                    <NotesError>
                        <MainPage activeFolder={activeFolder}/>
                    </NotesError>
            </div>
        )
    }
}

export default HomePage; 