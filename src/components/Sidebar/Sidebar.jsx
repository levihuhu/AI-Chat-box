import React from 'react'
import { useState } from 'react';
import './Sidebar.css'
import {assets} from '../../assets/assets.js'
import { useContext } from 'react';
import {Context} from '../../context/context';
const Sidebar = () => {
  const[extended,setExtended]=useState(false); 
  const{onSent,prevPrompt,setRecentPrompt,newChat}=useContext(Context);
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt)
    await onSent(prompt)
  }
  return (
    <div className='sidebar'>
        <div className="top">
       <img onClick={()=>setExtended(!extended)} className ='menu' src={assets.menu_icon} alt="sidebar" />
       <div onClick={newChat} className='new-chat'>
        <img src={assets.plus_icon} alt="add" />
        {extended?  <p>Add New Chat</p>:null}
       </div>
       {extended?
       <div className='recent'>
        <p className='recent-title'>Recent</p>
        {prevPrompt.map((item,index)=>{
          return(
        <div onClick={()=>loadPrompt(item)} className="recent-entry">
          <img src={assets.message_icon} alt="message" />
          <p>{item.slice(0,10)}...</p>
        </div>
      
          )
        })
      }
        </div>

        
       :null}

        </div>
       

        <div className="bottom">
          <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="question" />
            {extended?<p>Help</p>:null} 
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="question" />
            {extended?<p>History</p>:null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="question" />
            {extended?<p>Settings</p>:null}
          </div>


        </div>
    </div>
  )
}

export default Sidebar