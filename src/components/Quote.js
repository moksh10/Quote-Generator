import React from 'react'
import { useState,useEffect } from 'react'
import './Quote.css'
import axios from 'axios'
const Quote = () => {
   let [text, setText] = useState("")
   let [author, setAuthor] = useState("")
   let [loaded,isloaded] = useState(false)
   useEffect(()=>{
       isloaded(false)
       getQuote()
   },[])
   function getQuote()
   {
    isloaded(false)
    axios.get("https://type.fit/api/quotes")
    .then((response)=>{
        if(response.status!==200)
        {
            
            alert("Please Check Your Internet Connection");
            setText("Please Check Your Internet Connection");
            setAuthor("");
            isloaded(false);
            return;
        }
        let idx = Math.floor(Math.random()*response.data.length);
        let quote = response.data[idx].text;
        let by = response.data[idx].author;
        setText(quote);
        if(by==null){setAuthor("Anonymous")}else{setAuthor(by)};
        isloaded(true);
    
    })
    .catch((err)=>{
        alert("Please Check Your Internet Connection");
        setText("No Internet");
        setAuthor("");
        isloaded(true)
    });
   }

   
    return (
        <>
        <h1 className="heading">QUOTE GENERATOR</h1>
        <div className="quote-box">
            <div className="quote-text">{loaded?text:"Loading..."}</div>
            <div className="quote-author"><cite>- {loaded?author:"Loading..."}</cite></div>
        </div>
        <button className="button" onClick={getQuote}>New Quote</button>
        </>
            
    )
}

export default Quote
