import { createContext, useState } from "react";
import run from "../config/gemini";


export const Context = createContext();

const ContextProvider = (props) => {

    const[input, setInput] = useState("")
    const[recentPrompt, setRecentPrompt] = useState("")
    const[prevPrompt, setPrevPrompt] = useState([])
    const[showResult, setShowResult] = useState(false)
    const[loading, setLoading] = useState(false)
    const[resultData, setResultData] = useState("")
      
     
    const delayPra = (index,nextWord) => {
        setTimeout(function() {
            setResultData(prev=>prev+nextWord)
        },index*75)
    }
    const newChat = () => {
      
        setShowResult(false)
        setLoading(false)
    }

     const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt!==undefined){
            response = await run(prompt)
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompt(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await run(input)
        }
       let responseArray = response.split("**")
       let newResponse = "";
       for(let i=0; i<responseArray.length; i++){
          if(i === 0 || i%2 !== 1){
            newResponse+=responseArray[i];
          }
          else{
            newResponse+="<b>"+responseArray[i]+"</b>";
          }
       }
       let newResponse2 = newResponse.split("*").join("<br/>");
       let newResponseArray = newResponse2.split(" ")
       for(let i=0; i<newResponseArray.length; i++){
        const nextWord = newResponseArray[i];
        delayPra(i,nextWord+ " ")
       }
       setLoading(false)
       setInput("")

     }
     
   
    const contextValue = {
        // 这里是空的，但你可以添加：
        // 状态数据
        // 方法函数
        // 配置信息等
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider
