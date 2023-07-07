import React from 'react';


const KirayaNama = () => {
  return (
    <div className="service">
     <form className="plan-chooser">
  <div className="header">
    <span className="title">Choose your plan</span>
    <p className="desc">Amet minim mollit non deserunt ullamco est sit .</p>
  </div>
  <div className="plan-option">
    <input defaultValue="free" id="free" name="plan" type="radio" />
    <label htmlFor="free">
      <div className="plan-info">
        <span className="plan-cost">$0</span>
        <span className="plan-name">Try Free</span>
      </div>
    </label>
  </div>
  <div className="plan-option">
    <input defaultValue="monthly" id="monthly" name="plan" type="radio" />
    <label htmlFor="monthly">
      <div className="plan-info">
        <span className="plan-cost">$29/month</span>
        <span className="plan-name">Monthly plan</span>
      </div>
    </label>
  </div>
  <div className="plan-option">
    <input defaultValue="annual" id="annual" name="plan" type="radio" />
    <label htmlFor="annual">
      <div className="plan-info">
        <span className="plan-cost">$19/month</span>
        <span className="plan-name">$228 billed in a year</span>
      </div>
      <span className="reduction"> Save 20% </span>
    </label>
  </div>
  <a href="#" title="" className="choose-btn">
    {" "}
    Start{" "}
  </a>
</form>

    </div>
  );
}

export default KirayaNama;
