import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './Idea.css';

const maxCharCount = 140;

/**
 * Idea component
 *
 * Author Kevin Reynolds <kevin.reynolds@sensationmultimedia.com>
 *
 * Renders an idea
 *
 * @param {int} id
 * @param {object|string} created - date idea was created
 * @param {string} title - the title of the idea
 * @param {string} body - body copy for the idea
 * @param {function} onEdit - function to edit idea props
 * @param {function} onDelete - function to delete idea
 *
 * @return {Idea} An Idea component
 */

class Idea extends Component {

  constructor(props) {
    super(props);

    this.state = {
      body: this.props.body
    };
  }

  render() {
    const {id, title, created, onEdit, onDelete} = this.props;
    const {body} = this.state; //needed for char count

    return (
      <div className="idea">
        <header className="idea-title">
          <textarea 
            key={`idea-title-${id}`} 
            defaultValue={title} 
            onBlur={(e) => onEdit(id, e.target.value, 'title')} 
          />
        </header>

        <textarea 
          key={`idea-body-${id}`} 
          defaultValue={body} 
          onChange={(e) => this.setState({...this.state, body: e.target.value})}
          onBlur={(e) => onEdit(id, e.target.value, 'body')} 
          maxLength={maxCharCount}
          rows={4}
        />
        <div className="idea-body-count">
          {
            (maxCharCount - body.length < 15) 
            ? `${maxCharCount - body.length} chars remaining` 
            : ''
          }
        </div>

        <div className="idea-delete" onClick={() => onDelete(id)}>x</div>
        <div className="idea-date">{moment(created).format('DD/MM/YY')}</div>
      </div>
    );
  }
}

Idea.propTypes = {
  id: PropTypes.number.isRequired,
  created: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Idea;
