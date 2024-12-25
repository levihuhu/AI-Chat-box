import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'
import { useContext } from 'react'
const Main = () => {
    const{onSent,recentPrompt,showResult,loading,resultData,input,setInput} = useContext(Context)
  return (
    <div className='main'>
        <div className="nav">
            <p>Your Personal Assistant </p>
            <img src={assets.user_icon} alt="user" />
        </div>
        <div className="main-container">
            {
                !showResult?
                <>
                <div className="greet">
                <p>Hi, Richard</p>
                <span> how can I help you today?</span>
            </div>
            <div className="cards">
                <div className="card">
                    <p> Chat with me </p>
                    <img src={assets.message_icon} alt="chatgpt" />
                </div>
                <div className="card">
                    <p> can you help me with my homework? </p>
                    <p> 10 minutes ago </p>
                    <img src={assets.bulb_icon} alt="chatgpt" />
                </div>
                <div className="card">
                    <p>find a job in the next 30 days would be great</p>
                    <img src={assets.compass_icon} alt="compass" />
                </div>
                <div className="card">
                    <p>I sometimes feel lonely and miss my friends and family where would i go in the future?</p>
                    <img src={assets.code_icon} alt="bulb" />
                </div>
            </div>
                </>
                :
                <div className="result">
                    <div className="result-title">
                        <img src={assets.user_icon} alt="chatgpt" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="gemini" />
                        {
                            loading?
                            <div className="loader">
                                <hr />
                                <hr />
                                <hr />
                            </div>
                            :
                            <p dangerouslySetInnerHTML={{__html: resultData}}></p>
                        }
                     
                    </div>
                </div>
            }
            
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Search...' />
                    <img src={assets.gallery_icon} alt="gallery" />
                    <img src={assets.mic_icon} alt="voice" />
                    <img onClick={() => onSent()} src={assets.send_icon} alt="mic" />
                </div>
                <p className="bottom-info">
                    your AI assistant may not be able to answer all your questions and provide missing information, please be patient with it.
                </p>
            </div>
        </div>
      
    </div>
  )
}

export default Main