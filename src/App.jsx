
import { useState } from 'react'
import './App.css'
import { useCallback } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'

function App() {
  const [length,setLength]=useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const[charAllowed,setCharAllowed]=useState(false)
  const [password,setPassword]=useState("")
  
  const passwordRef=useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(()=>{passwordGenerator()},[length, numberAllowed, charAllowed, setPassword])

  const copyit=useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  })

  return (
    <> 
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
    <h1 className='text-white text-center my-3'>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
    <input value={password} placeholder='password' readOnly className='outline-none w-full py-1 px-3' ref={passwordRef}></input>
    <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyit} >copy</button>
    </div>
    <div className='overflow-hidden flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input type="range" min={8} max={20} value={length} className='cursor-pointer'
      onChange={(e)=>{setLength(e.target.value)}}/>
      <label >Length:{length}</label>
    </div>
    <div className='overflow-hidden flex items-center gap-x-1'>
      <input type="checkbox"
        defaultChecked={numberAllowed}
        id='numberInput'
        onChange={()=>{
          setNumberAllowed((prev)=>!prev)
        }} />
        <label> Number</label>
    </div>
    <div className='overflow-hidden flex items-center gap-x-1'>
      <input type="checkbox"
        defaultChecked={charAllowed}
        id='numberInput'
        onChange={()=>{
          setCharAllowed((prev)=>!prev)
        }} />
        <label> Character</label>
    </div>
    </div>
      </div>
      
    
    </>
  )
}

export default App
