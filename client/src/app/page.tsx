'use client'
import Nav from "./components/Nav";
import React,{useEffect,useState} from "react";
import '@/app/components/Styles.css'
export default function Home(){
    async function trun(){
        const res=await fetch("http://127.0.0.1:8080/process")
        console.log(res)
    }

    const [result,setResult]=useState('Loading')
    useEffect(()=>{
        fetch("http://localhost:8080/process",{mode:"no-cors",method:'POST'}).then((data)=>{
            console.log(data)
        })
    },[])
    
    return(
        <div id="Home">
            <Nav/>
            <form action="http://127.0.0.1:8080/process" method='POST' >
                <textarea id="input_text" name="text_analyze" />
                <button id="analyse">Analyse text</button>
                <div>{result}</div>
            </form>
        </div>
    );
}