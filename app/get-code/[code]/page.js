"use client"
import { useEffect, useState } from 'react';
import '../../components/card.css'
import Link from 'next/link';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function Home({ params }) {
  const router = useRouter()
  const { code } = params

  // const handleSubmitCode = async () => {
  //   try {
  //     const res = await axios.post('/api/get_url', { code });

  //     if (res?.data?.success) {
  //       window.open(res?.data?.data?.url, '_blank');
  //     } else {
  //       toast.error(res?.data?.message);
  //     }
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message);
  //   }
  // };


  const handleSubmitCode = async () => {
    try {
      const res = await axios.post('/api/get_url', { code });
  
      if (res?.data?.success) {
        const newTab = document.createElement('a');
        newTab.href = res.data.data.url;
        newTab.target = '_blank';
        newTab.click();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };


  // const handleSubmitCode = async () => {
  //   // Function to check if popups are blocked
  //   const checkPopupPermission = () => {
  //     const newTab = window.open('', '_blank');
  //     console.log("newtabnewtagb", newTab);
      
  //     if (newTab) {
  //       newTab.close();
  //       return true; // Popups are allowed
  //     }
  //     return false; // Popups are blocked
  //   };
  
  //   // Function to show permission request modal
  //   const showPermissionModal = () => {
  //     return new Promise((resolve) => {
  //       // Replace this with your modal implementation
  //       const userResponse = window.confirm("This action requires permission to open a new tab. Allow?");
  //       resolve(userResponse);
  //     });
  //   };
  
  //   try {
  //     const res = await axios.post('/api/get_url', { code });
  
  //     if (res?.data?.success) {
  //       if (checkPopupPermission()) {
  //         const newTab = document.createElement('a');
  //         newTab.href = res.data.data.url;
  //         newTab.target = '_blank';
  //         newTab.click();
  //       } else {
  //         const permissionGranted = await showPermissionModal();
  //         if (permissionGranted) {
  //           const newTab = document.createElement('a');
  //           newTab.href = res.data.data.url;
  //           newTab.target = '_blank';
  //           newTab.click();
  //         } else {
  //           toast.error("Permission required to open the link.");
  //         }
  //       }
  //     } else {
  //       toast.error(res?.data?.message);
  //     }
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message);
  //   }
  // };
  
  

  return (
    <div className='h-[100vh] font-bold text-[#202124] font-sans  flex bg-[#F0F4F9] items-center justify-center flex-col'>

      <div className="container">
        <div className="row">
          <img src="/image/final-logo.png" alt="Google Logo" />

        </div>
        <div className="row">
          <h1>Here Your Code</h1>
          <div className="code">
            <h1>{code}</h1>
          </div>
          <br />

          <div className="flex max-md:flex-col gap-2 items-center ">



            <button onClick={handleSubmitCode} className="btn ">
              Test
            </button>


            <button
              className="btn"
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(code)
                    .then(() => {
                      alert('Code Copied');
                    })
                    .catch((err) => {
                      console.log('Error copying to clipboard:', err);
                      alert('Failed to copy');
                    });
                } else {
                  alert('Clipboard not supported');
                }
              }}
            >
              Copy
            </button>
            <button className="btn" onClick={() => router.push(`/share/${code}`)} >
              Share
            </button>
          </div>
        </div>

      </div>

    </div>

  );
}
