import React, { Component } from 'react';
import NoteForm from '../NoteForm/NoteForm';
import ApiContext from '../ApiContext'
import Config from '../Config';
import PropTypes from 'prop-types';
import './add-folder.css';

class AddFolder extends Component {
    static contextType = ApiContext;

    constructor(props){
        super(props);
        this.state = {
          folderName: " ",
        }
    }

    updateFolderName(folderName) {
        this.setState({folderName})
    }

    
    handleSubmit = e => {
        e.preventDefault()
        const folder = {
          name: e.target['folderName'].value
        }
        fetch(`${Config.API_ENDPOINT}/folders`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(folder),
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(folder => {
            this.context.addFolder(folder)
            this.props.history.push(`/folder/${folder.id}`)
          })
          .catch(error => {
            console.error({ error })
          })
      }

    render () {
        return (
       <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NoteForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' name='folderName' onChange={e => this.updateFolderName(e.target.value)}/>
           
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </NoteForm>
      </section>
    )
    }
}

export default AddFolder;

AddFolder.defaultProps = {
    history: PropTypes.Object,
  }