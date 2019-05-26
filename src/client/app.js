import React, { useEffect, useState } from 'react';
import './app.css'
const getCounters = async () => {
  return await fetch('/api/v1/counters')
    .then(res => res.json())
}

function ComputeTotal({ counters }) {

  //
  //sum of all the counter values
  //
  const addCounts = () => {
    return counters.reduce((amount, next) => {
      return amount + next.count
    }, 0)
  }

  return (
    <div className="menu">
      <div className="menu-item">
        <span>Total Count:</span>
        <div className="menu-badge">
          <label className="label label-primary"> {addCounts()}</label>
        </div>
      </div>
    </div>



  )

}
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

function App() {
  const [counters, setCounter] = useState([])

  //**
  //  * Delete Item
  //  * @param {} id 
  //  */

  const deleteCounter = (id) => {
    fetch('/api/v1/counter', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }).then(data => {
      data.status == 200 ? console.log('Successfully Deleted Item') : console.error('Something went wrong!')
    })
  }

  //**
  //  * Increment Counter Value
  //  * @param {} id 
  //  */
  const incCounter = (id) => {
    fetch('/api/v1/counter/inc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }).then(data => {
      data.status == 200 ? console.log(`Successfully Updated id: ${id}`) : console.error('Something went wrong!')
    })
  }
  //**
  //  * Decrement Counter Value
  //  * @param {} id 
  //  */
  const decCounter = (id) => {
    fetch('/api/v1/counter/dec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }).then(data => {
      data.status == 200 ? console.log(`Successfully Updated id: ${id}`) : console.error('Something went wrong!')
    })
  }

  useEffect(() => {
    getCounters().then(counters => {
      setCounter(counters)
    })
  })

  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-title text-center">
          <h1>Counter App</h1>
        </div>
        <div className="text-center">

        <InputForm />

      </div>
      </div>
      
      <div className="body-panel">
        <div className="menu list">
          {counters.length ? counters.map(({ id, title, count }, index) => (
            <div className="menu-item" key={index}>
              <div className="columns">
                <div className="column col-2">
                  <button className="btn btn-error" onClick={() => deleteCounter(id)}><i className="icon icon-cross"></i></button>
                </div>
                <div className="column col-6">
                  {title}
                </div>
                <div className="column col-4">
                  <div className="menu-badge">
                    <button className="btn" onClick={() => decCounter(id)}><i className="icon icon-minus"></i></button>
                    <label className="label label-primary"> {count}</label>
                    <button className="btn" onClick={() => incCounter(id)}><i className="icon icon-plus"></i></button>
                  </div>
                </div>
              </div>
            </div>
          )) : null}
        </div>

      </div>
      <div className="panel-footer">
        {counters.length ? <ComputeTotal counters={counters} /> : null}
      </div>
    </div>
  );


}

export default App
