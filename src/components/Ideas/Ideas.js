import React, { Component } from 'react';
import store from 'store';
import moment from 'moment';
import VirtualizedSelect from 'react-virtualized-select'

import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

import {bindAll, getMaxId, getById, addOrRemoveFromArray} from '../../utilities';

import Idea from '../Idea/Idea';

import './Ideas.css';

const IdeasDefault = [
  {
    id: 1,
    created: '2017-12-25',
    title: 'Christmas Presents',
    body: 'Mum: perfume, Dad: cigars'
  },
  {
    id: 2,
    created: '2018-02-10',
    title: 'Valentines date',
    body: 'Buy chocs'
  },
  {
    id: 3,
    created: '2018-03-19',
    title: 'Summer holiday',
    body: 'Los Angeles, Sydney'
  }
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ideas: store.get('ideas'),
      sort: 'date',
      showSaved: false
    };

    bindAll([
      'addIdea',
      'editIdea',
      'deleteIdea',
      'saveIdeas',
      'sortBy',
      'hideNotification'
    ], this);
  }

  componentWillMount() {
    if(!store.get('ideas')) {
      this.saveIdeas(IdeasDefault);
    }
  }

  saveIdeas(ideas) {
    store.set('ideas', ideas);

    this.setState({
      ...this.state,
      ideas,
      showSaved: true
    });

    this.hideNotification();
  }

  addIdea(title, body) {
    const {ideas} = this.state;

    const newId = getMaxId(ideas);

    const newIdea = {
      id: newId,
      created: moment(),
      title: title,
      body: body
    };

    ideas.push(newIdea);

    this.setState({
      ...this.state,
      ideas: ideas
    });
  }

  deleteIdea(id) {
    const {ideas} = this.state;

    const newIdeas = ideas.filter((idea) => {
      return idea.id !== id
    });
    
    this.setState({
      ...this.state,
      ideas: newIdeas
    });

    store.set('ideas', newIdeas);
  }

  editIdea(id, value, type='title') {
    const {ideas} = this.state;

    const ideaToEdit = getById(ideas, id);

    let newIdeas = addOrRemoveFromArray(ideas, ideaToEdit);

    ideaToEdit[type] = value;

    newIdeas = addOrRemoveFromArray(ideas, ideaToEdit, ideaToEdit[type]);

    this.setState({
      ...this.state,
      ideas: newIdeas
    });

    this.saveIdeas(newIdeas);
  }

  sortBy(value) {
    this.setState({
      ...this.state,
      sort: value.selectValue.value
    })
  }

  hideNotification() {
    this.notificationTimeout = setTimeout(() => {
      this.setState({
        ...this.state,
        showSaved: false
      });
    }, 2000);
  }

  render() {
    const {ideas, sort, showSaved} = this.state;

    if(sort === 'date') {
      ideas.sort(function(a, b) {
        a = new Date(a.created);
        b = new Date(b.created);
        return a>b ? -1 : a<b ? 1 : 0;
      });
    } else if(sort === 'title') {
      ideas.sort(function(a, b) {
        a = a.title;
        b = b.title;
        return a<b ? -1 : a>b ? 1 : 0;
      });
    }

    return (
      <div className="ideas-board">
        <header className="ideas-board-header">
          <h1>Ideas Board</h1>
          {showSaved && <span className="notification">CHANGES SAVED</span>}
        </header>

        <div className="ideas-board-sort">
          Sort by
          <VirtualizedSelect
            options={[{ label: "Title", value: 'title' },{ label: "Date", value: 'date' }]}
            onChange={(selectValue) => this.sortBy({ selectValue })}
            value={this.state.sort}
            clearable={false}
          />
        </div>

        <div className="ideas-list">
          {
            (ideas && ideas.length)
            ? ideas.map((idea, i) => {
              return (
                <Idea 
                  ref={`idea${idea.id}`} 
                  key={idea.id} 
                  {...idea} 
                  onEdit={this.editIdea} 
                  onDelete={this.deleteIdea} 
                />
              )
            })
            : (
              <div className="ideas-list-empty">No ideas to show</div>
            )
          }
          <div className="ideas-list-add" onClick={() => this.addIdea('Add name...','Add body...')}>+</div>
        </div>
      </div>
    );
  }
}

export default App;
