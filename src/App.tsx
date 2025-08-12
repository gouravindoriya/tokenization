// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useRef, useState } from 'react';
import './App.css'

function App() {

  // const vocab: Record<string, number> = {};
  const vocabRef = useRef<Record<string, number>>({});
const idCounterRef = useRef(0);
  const ref=useRef(null)
  const [regex,setregex]=useState(/@\w+|#\w+|[\u0900-\u097F]+|\p{Extended_Pictographic}|\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b|\w+(?:'\w+)?|[.,!?;]|\s+/gu)
  const [tokenData, settokenData] = useState(customEncode("hey gpt"));
  function customEncode(text: string) {
  const tokens = text.match(regex) || [];

  const ids = tokens.map((token) => {
    if (!(token in vocabRef.current)) {
      vocabRef.current[token] = idCounterRef.current++;
    }
    return vocabRef.current[token];
  });

  return { tokens, ids };
}


  function customDecode(ids: number[]) {
 const arr: string[] = new Array(Object.keys(vocabRef.current).length).fill(0);

   for(let item in Object(vocabRef.current)){
    arr[Object(vocabRef.current)[item]] = item;
   }
   
    //  console.log(arr);
     let str="";
     ids.forEach(id=>{
      str+=arr[id]
     })


    return str;
  }


  
  


  return (
    <>
      <div className="col-span-4 flex justify-center items-center text-3xl font-thin  bg-white shadow-md rounded-lg py-4">
        {/* HTML, CSS & JS */}
        Tokenization
      </div>
      <div className="grid grid-cols-4 bg-gray-100 min-h-[30vh] gap-3 p-4">

        {/* Header */}


        {/* Textarea Section */}
        <div className="col-span-4 bg-white p-4 rounded-lg shadow-md flex flex-col gap-3">
          {/* <div className=' grid gap-2'>

        
          <label className="text-base font-medium text-gray-800 ">Custom Regex</label>
          <input ref={ref} type="text " className='w-full min-h-[30px] p-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-none resize-none'
          placeholder={`default:  ${regex} - working soon `}
          // onChange={(e)=>setregex(RegExp(e.target.value)||regex)}
          />
          <button className=" inline-flex w-fit items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200"
          onClick={()=>{
            let obj=Object(ref)
            
            setregex(RegExp(obj.current.value)||regex)
          }}
          >
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-transparent ">
Set Regex
</span>
</button>

            </div> */}
          <label className="text-base font-medium text-gray-800">Your message</label>
          <textarea
            className="w-full min-h-[150px] p-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 
                     outline-none resize-none"
            placeholder="The quick brown fox jumps over 13 lazy dogs, happily coding in 2025 🚀 #AI"
           
            onChange={(e) => {
              settokenData(customEncode(e.target.value||"The quick brown fox jumps over 13 lazy dogs, happily coding in 2025 🚀 #AI"));
            }}
          ></textarea>

          <p className="text-base font-medium text-gray-800">Your Decoded String</p>
          <div id='decodeString' className='bg-white p-4 rounded-lg shadow-md text-sm font-mono text-gray-700 flex flex-wrap gap-1'>
            {
              customDecode(tokenData.ids)
            }
          </div>
        </div>
         

        



      </div>

        <div className='w-screen bg-white p-4  text-sm font-mono text-gray-700 flex flex-wrap gap-2 items-center px-12'>
            {
              tokenData.tokens.map((token, index) => {
                if (token == " ") return;
                return <div key={index} className='inline p-4 py-2 h-fit shadow-sm bg-indigo-50  backdrop-blur-2xl rounded'>{token}</div>
              }

              )
            }
          </div>
    </>
  )
}

export default App
