import React, { Component } from 'react';
import NoteForm from '../NoteForm/NoteForm';
import ApiContext from '../ApiContext'
import Config from '../Config';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError';
import './add-folder.css';

class AddFolder extends Component {
    static contextType = ApiContext;

    constructor(props){
        super(props);
        this.state = {
          folderName: " ",
          folderNameValid: false,
          formValid: false,
            validationMessages: {
                folderName: '',
             }
        }
    }

    updateFolderName(folderName) {
        this.setState({folderName}, () => {this.validateFolderName(folderName)})
    }

    validateFolderName(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;
    
        fieldValue = fieldValue.trim();
        if(fieldValue.length === 0) {
          fieldErrors.folderName = 'Folder name is required';
          hasError = true;
        } else {
          if (fieldValue.length < 3) {
            fieldErrors.folderName = 'Name must be at least 3 characters long';
            hasError = true;
          } else {
            fieldErrors.folderName = '';
            hasError = false;
          }
        }
    
        this.setState({
          validationMessages: fieldErrors,
          folderNameValid: !hasError
        }, this.formValid );
    
    }
    
    formValid() {
        this.setState({
          formValid: this.state.folderNameValid 
        });
      }

    handleSubmit = e => {
        e.preventDefault()
        const folder = {
          name: e.target['folder-name'].value
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
            <input type='text' id='folder-name-input' name='folder-name' onChange={e => this.updateFolderName(e.target.value)}/>
            <ValidationError hasError={!this.state.folderNameValid} message={this.state.validationMessages.folderName}/>
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