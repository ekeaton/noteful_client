import React, { Component } from 'react';
import { NavLink, Link } from "react-router-dom";
import Button from '../Button/Button'
import './side-bar.css';



class Sidebar extends Component {

    folderActive(folder) {
        let folderLink ='/folder/' + folder.id;
        let hover ='folder';
        if (folder.id === this.props.activeFolder) {
            hover = 'folder-highlight' + hover;
        }
            return (
                <NavLink to={folderLink}>
                    <div 
                        key={folder.id}
                        className={hover}>
                            {folder.name}
                        </div>
                    </NavLink>
                 )
            }
    render() {
        if (this.props.folders) {
            let folders = this.props.folders.map((folder) => this.folderActive(folder))
        
        return (
            <div className="sidebar">
                <div className="folder-display">
                    {folders}
                </div>
                <Button
                  tag={Link}
                  to= '/add-folder'
                  types='button'
                  className='add-folder-button'>
                      Add Folder
                  </Button>
            </div>
        )
    }
  }
}

export default Sidebar; 
