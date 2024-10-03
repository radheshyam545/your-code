"use client";

import { useState, useEffect } from 'react';
import '../components/card.css';
import Link from 'next/link';
import { toast } from 'react-toastify';
import axios from 'axios';
export default function Home() {
  const [code, setCode] = useState('');



  const handleSubmitCode = async () => {
    try {
      const res = await axios.post('/api/get_url', { code });
      console.log(res);
      const newWindow = window.open('', '_blank');
      
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        newWindow.location.href = res?.data?.data?.url;
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="h-[100vh] font-bold text-[#202124] font-sans flex bg-[#F0F4F9] items-center justify-center flex-col">


      <div className="container ">
        <div className="row">
          <img src="./image/final-logo.png" alt="Google Logo" />
          <h1>Enter Website Code</h1>
        </div>
        <div className="row">
          <h1>Enter code to visit the website</h1>

          <div style={{ position: 'relative' }}>
            <input
              value={code}
              onChange={(e) => {
                if (e.target.value.length <= 6) {
                  setCode(e.target.value);
                }
              }}
              className="mb-4 font-thin"
              type="text"
              placeholder="Enter Code"
            />
          </div>
          <div className="button-style">

           
            <button onClick={handleSubmitCode} className="btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
