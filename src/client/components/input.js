import React, { useState } from 'react';

function InputForm() {
    const [title, setTitle] = useState('')
  
    const submitHandler = (event) => {
      event.preventDefault()
      fetch('/api/v1/counter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      }).then(data => {
        if (data.status != 200) {
          console.error('Something went wrong!')
        }
  
        console.log('Successfully created an item!')
        setTitle('')
      })
    }
  
    return (
      <form className="columns form-group">
        <div className="column col-10">
          <input className="form-input" id="inputName" type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="input name here" />
          </div>
        <div className="column col-2 text-right">      
          <button className="btn" id="submitHandler" onClick={submitHandler}>add</button>
        </div>
      </form>
    )
  }

  export default InputForm
  