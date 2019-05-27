
import React from 'react';


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

  export default ComputeTotal
