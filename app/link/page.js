"use client"
import { useState } from 'react';
import '../components/card.css'
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState(true);
  const routes = useRouter();


  console.log("hello from link page");
  

  const handleSubmitLINK = () => {

    if (isValidURL(url) && url) {
      try {

        const res = axios.post('/api/GenerateCode', { url })
        res.then((res) => {
          console.log(res?.data);
          if (res?.data?.success) {
            routes.push('/get-code/' + res?.data?.data?.code)
            localStorage.setItem('link', url)
          }
        }).catch((err) => {
          toast.error(err?.response?.data?.message)
        })

      } catch (error) {
        toast.error(err?.response?.data?.message)
      }
    }
  }

  function isValidURL(url) {
    var urlRegex = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);

    if (url !== '') {
      setError(urlRegex.test(url))
    } else {
      setError(false)
    }
    return url
  }



  return (
    <div className='h-[100vh] font-bold text-[#202124] font-sans  flex bg-[#F0F4F9] items-center justify-center flex-col'>

      <div className="container">
        <div className="row">
          <img src="/image/final-logo.png" alt="Google Logo" />
          <h1>Enter Website Link</h1>
        </div>
        <div className="row">
          <h1>Enter Website Link To Create Code</h1>

          <div style={{ position: 'relative' }}>
            <input value={url} onChange={(e) => setUrl(isValidURL(e.target.value))}
              className={`${!error ? 'border-red-500 bg-red-100' : ' border-blue-200'} border outline-none mb-4 font-thin`} type="text"
              placeholder="Enter Link"></input>
          </div>
          <div className="button-style">
            <Link href={'/'}>have a code?</Link>

            <button onClick={handleSubmitLINK} className="btn">Get Code</button>
          </div>
        </div>

      </div>

    </div>

  );
}


