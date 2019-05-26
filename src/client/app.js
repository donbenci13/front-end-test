import React, { useEffect, useState } from 'react';

const getCounters = async () => {
  return await fetch('/api/v1/counters')
    .then(res => res.json())
}

function ComputeTotal({counters}){
  

  const addCounts = ()=>{
    return counters.reduce((amount,next)=>{
      return amount + next.count
    },0)
  }

  return(
    <div>
      <span>Total Count:</span>
      <span>{addCounts()}</span>
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
      body: JSON.stringify({title})
    }).then(data=>{
      if(data.status != 200){
        console.error('Something went wrong!')
      }
      
      console.log('Successfully created an item!')
      setTitle('')
    })
  }

  return (
    <form>
      <input type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="input name here" />
      <button onClick={submitHandler}>add</button>
    </form>
  )
}

function App() {
  const [counters, setCounter] = useState([])
  // const getCounters = () => {
  //   fetch('/api/v1/counters')
  //     .then(res => res.json())
  //     .then(ctr => {
  //       setCounter(ctr)
  //     });
  // }

  const deleteCounter = (id) => {
    fetch('/api/v1/counter',{
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
    }).then(data=>{
      data.status == 200 ? console.log('Successfully Deleted Item') : console.error('Something went wrong!')
    })
  }

  const incCounter = (id) => {
    fetch('/api/v1/counter/inc',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
    }).then(data=>{
      data.status == 200 ? console.log(`Successfully Updated id: ${id}`) : console.error('Something went wrong!')
    })
  }

  const decCounter = (id) => {
    fetch('/api/v1/counter/dec',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
    }).then(data=>{
      data.status == 200 ? console.log(`Successfully Updated id: ${id}`) : console.error('Something went wrong!')
    })
  }

  useEffect(() => {
    getCounters().then(counters=>{
      setCounter(counters) 
    }) 
  })

  return (
    <div>
      <h1>Counter App</h1>
      <InputForm />
      {counters.length ? counters.map(({id,title,count}, index) => (
        <div key={index}>
         <button onClick={()=>deleteCounter(id)}>x</button>
          {title} 
          <button onClick={()=>decCounter(id)}>-</button>
          {count}
          <button onClick={()=>incCounter(id)}>+</button>
        </div>
      )) : null}
      {counters.length ? <ComputeTotal counters={counters} /> : null}
      
    </div>
  );
}

export default App
