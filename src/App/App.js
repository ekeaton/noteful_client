import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import '../ApiContext';
import config from "../Config";
import HomePage from '../HomePage/HomePage';
import NotePage from '../NotePage/NotePage'
import './app.css';
import ApiContext from '../ApiContext';

class App extends Component {
  state = {
    notes: [],
    folders: [],
  }


	componentDidMount(){
		Promise.all([
			fetch(`${config.API_ENDPOINT}/notes`),
			fetch(`${config.API_ENDPOINT}/folders`)
		])
		.then (([noteRes, folderRes]) => {
			return Promise.all([
				noteRes.json(),
				folderRes.json(),
				])
		})
		.then(([notes, folders]) => {
			this.setState({ notes, folders })
		})
	}

	handleDeleteNote = noteId => {
    	this.setState({
      	notes: this.state.notes.filter(note => note.id !== noteId)
   	 })
  	}





  render() {
    const value = {
			notes: this.state.notes,
			folders: this.state.folders,		
			deleteNote: this.handleDeleteNote,
		
	
		}
    return (
      <ApiContext.Provider value={value}>
      <Router>
      <div className='App'>
        <header className='App__header'>
          <h1>
            <Link to='/'>Noteful</Link>
          </h1>
        </header>   
        <main className='App__main'>
          <Route
            exact path="/"
            component={HomePage}
          />

          <Route
            path="/folder/:activeFolderId"
            component={HomePage}
            />

            <Route 
              path="/note/:activeNoteId"
              component={NotePage}
              />
        </main>
      </div>
      </Router>
     </ApiContext.Provider>
    )
  }
}

export default App;
