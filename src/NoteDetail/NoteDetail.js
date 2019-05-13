import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import config from '../Config';
import PropType from 'prop-types'
import './note-detail.css';

class NoteDetail extends React.Component {
	static contextType = ApiContext

	static defaultProps ={
	  onDeleteNote: () => {},
	  }
	  

	  handleClickDelete = e => {
	  	e.preventDefault(); 
	    const {activeNote} = this.props
	  

	    fetch(`${config.API_ENDPOINT}/notes/${activeNote.id}`, {
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
	        this.context.deleteNote(activeNote.id)
	        window.history.back();
	      })
	  }

	render() {
		
			var { activeNote} = this.props
			
			
		return(
			<main>
				<div className="noteinfo">
					<h1>{activeNote.name}</h1>
					<p>{activeNote.modified}</p>
					<Link to="/"><button onClick={this.handleClickDelete}>Delete Note</button></Link>
				</div>
				<p>{activeNote.content}</p>
			</main>
			)
		}
		
}

NoteDetail.propType = {
	activeNote: PropType.array,
}

export default NoteDetail;