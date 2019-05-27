import React, { useEffect, useState } from 'react';
import ComputeTotal from './components/total'
import InputForm from './components/input'
import './app.css'

const getCounters = async () => {
  return await fetch('/api/v1/counters')
    .then(res => res.json())
}

function App() {
  const [counters, setCounter] = useState([])
  
  /**
    * Delete Item
    * @param {string} id
    */
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

  /**
    * Increment Counter Value
    * @param {string} id
    */
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

  /**
    * Decrement Counter Value
    * @param {string} id 
    */
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
          <h1>COUNTER APP</h1>
        </div>
        <div className="text-center">
          <InputForm />
        </div>
      </div>
      
      <div className="body-panel">
        <div className="{counters.length > 0 ? 'menu list' : ''}">
          {counters.length ? 
          counters.map(({ id, title, count }, index) => (
            <div className="menu-item" key={index}>
              <div className="columns">
                <div className="column col-2">
                  <button className="btn btn-error" onClick={() => deleteCounter(id)}><i className="icon icon-cross"></i></button>
                </div>
                <div className="column col-6">
                  {title}
                </div>
                <div className="column col-4 text-right">
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
        {counters.length > 0 ? 
          <div className="panel-footer">
            <ComputeTotal counters={counters} /> 
          </div>
        : null}
    </div>
  );


}

export default App
