// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState } from 'react';
import './App.css'

function App() {

  const vocab: Record<string, number> = {};


  let idCounter = 1;

  function customEncode(text: string) {
    const regex = /@\w+|#\w+|[\u0900-\u097F]+|\p{Extended_Pictographic}|\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b|\w+(?:'\w+)?|[.,!?;]|\s+/gu


    const tokens = text.match(regex) || [];

    const ids = tokens.map(token => {
      if (!(token in vocab)) {
        vocab[token] = idCounter++;
      }
      return vocab[token];
    });

    return { tokens, ids };
  }


function customDecode(ids: number[]) {
  // Reverse vocab: ID -> token
  const vocabtype_2: Record<number, string> = {};
  for (const token in vocab) {
    const id = vocab[token];
    vocabtype_2[id] = token; // number as key
  }

  console.log("Reversed vocab:", vocabtype_2);

  let str = "";

  for (const id of ids) {
    const token = vocabtype_2[id];
    if (token !== undefined) {
      str += token;
    } else {
      str += "[UNK]"; // unknown token placeholder
    }
  }

  console.log("Decoded string:", str);
  return str;
}






  const [tokenData, settokenData] = useState(customEncode(""));

  // console.log(tokenData)
  // console.log(customDecode(tokenData.ids))



  return (
    <>
      <div className="grid grid-cols-4 bg-gray-100 min-h-screen gap-3 p-4">

        {/* Header */}
        <div className="col-span-4 flex justify-center items-center text-4xl font-bold bg-white shadow-md rounded-lg py-4">
          {/* HTML, CSS & JS */}
          Tokenization
        </div>

        {/* Textarea Section */}
        <div className="col-span-4 bg-white p-4 rounded-lg shadow-md flex flex-col gap-3">
          <label className="text-base font-medium text-gray-800">Your message</label>
          <textarea
            className="w-full min-h-[150px] p-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 
                     focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none resize-none"
            placeholder="Write your thoughts here..."

            onChange={(e) => {
              settokenData(customEncode(e.target.value));
            }}
          ></textarea>

          <div className='bg-white p-4 rounded-lg shadow-md text-sm font-mono text-gray-700 flex flex-wrap gap-1'>
            {
              tokenData.tokens.map((token, index) => {
                if (token == " ") return;
                return <div key={index} className='inline p-1 bg-green-200 h-fit'>{token}</div>
              }

              )
            }
          </div>
          <div className='bg-white p-4 rounded-lg shadow-md text-sm font-mono text-gray-700 flex flex-wrap gap-1'>
            {
             customDecode(tokenData.ids)
            }
          </div>
        </div>

        {/* IDs Section */}
        <div className="col-span-2 bg-white p-4 rounded-lg shadow-md  text-sm font-mono text-gray-700 break-words">
          {tokenData.ids.toString()}

        </div>



      </div>
    </>
  )
}

export default App
