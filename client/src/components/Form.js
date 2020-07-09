import React from 'react';
import axios from 'axios';
import './Form.css';

class Form extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    };

    this.amount = React.createRef();
    this.date = React.createRef();
    this.category = React.createRef();
    this.info = React.createRef();
  }

  sendPostRequest = event => {
    event.preventDefault();

    axios.post('http://localhost:5001/exp', {
      amount: this.amount.current.value,
      category: this.category.current.value,
      date: new Date(this.date.current.value),
      info: this.info.current.value 
    }).then( response => console.log(response))
      .catch( ex => console.log(ex));
  }

  render() {
    return (
      <div className="form">
        <form onSubmit={this.sendPostRequest}>
          <label htmlFor="amount">Amount</label>
          <input ref={this.amount} type="text" id="amount" name="amount" />

          <label htmlFor="date">Date</label>
          <input ref={this.date} type="date" id="date" name="date" />

          <label htmlFor="category">Category</label>
          <input ref={this.category} list="categories" id="category" name="category" />

          <datalist id="categories">
            <option value="Jedzenie" />
            <option value="Środki czystości" />
            <option value="Higiena" />
            <option value="Hobby/Sport" />
            <option value="Rozrywka" />
            <option value="Odzież" />
            <option value="Inne" />
          </datalist>

          <label htmlFor="info">Info</label>
          <textarea ref={this.info} name="info" id="info" cols="40" rows="2" />
        
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }

}

export default Form;