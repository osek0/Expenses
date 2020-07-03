import React from 'react';
import './Form.css';

class Form extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="form">
        <form>
          <label htmlFor="amount">Amount</label>
          <input type="text" id="amount" name="amount" />

          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" />

          <label htmlFor="category">Category</label>
          <input list="categories" id="category" name="category" />

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
          <textarea name="info" id="info" cols="40" rows="2" />
        </form>
      </div>
    )
  }

}

export default Form;