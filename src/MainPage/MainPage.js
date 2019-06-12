import React from 'react';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext'
import config from '../Config'
import Button from '../Button/Button'
import PropTypes from 'prop-types'
import './main-page.css'


class MainPage extends React.Component {
	static defaultProps ={
    onDeleteNote: () => {},
	}
	
	static contextType = ApiContext


	handleClickDelete = (note) => (e) => {
		e.preventDefault(); 

		fetch(`${config.API_ENDPOINT}/notes/${note.id}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json'
			},
		})
			.then(res => {
				if (!res.ok) {return res.json().then(e => Promise.reject(e))}
				return res.json()
			})
			.then(() => {
				this.context.deleteNote(note.id)
				 console.log(this.props.history.push(`/`))
				 
			})
			.catch(error => {
        console.error({ error })
      })
	}


		  
	noteHTML(note) {

		let noteLink = "/note/" + note.id
		let hover = "note";
		if (note.id === this.context.activeNote) {
			hover = "note-highlight " + hover;
		} 
		return (
		
			<div className={hover}>
				<h3> <Link to={noteLink}><div id={note.id}> {note.name}</div></Link></h3>
				<p>Date Modified: {note.modified}</p>
				<button onClick={this.handleClickDelete(note)}>Delete Note</button>
			</div>);

	}

	render() {
		
		let folderNotes = this.context.notes;
		if (this.props.activeFolder) {
			folderNotes = this.context.notes.filter((notes) => notes.folderId === this.props.activeFolder);
		}
		const notes = folderNotes.map((note) => this.noteHTML(note))
			
		return(
			<main>
				{notes}
				  <Button
				     tag={Link}
				     to='/add-note'
				     type='button'
				     className='add-note-button'>
				    Add Note
				     </Button>
			</main>
			)
		}
}

MainPage.propTypes = {
	activeFolder: PropTypes.string
}

export default withRouter(MainPage);