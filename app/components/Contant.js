"use client"

import { useEffect, useState } from 'react'
import './card.css'
import axios from 'axios'

import {

    LinkedinShareButton,

    TelegramShareButton,

    TwitterShareButton,

    WhatsappShareButton,
} from "react-share";
import { Modal } from "antd";
import Link from 'next/link';

const Contant = () => {
    const [value, setValue] = useState('link')
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('Hyperlinks');
    const [error, setError] = useState(true);
    const [code, setCode] = useState();
    const [verifiedCode, setVerifiedCode] = useState(false);
    const [networkError, setNetworkError] = useState('');
    const [networkSuccess, setNetworkSuccess] = useState('');

    const handleSubmitLINK = () => {

        if (isValidURL(url) && url) {
            try {

                const res = axios.post('/api/GenerateCode', { url, category })
                res.then((res) => {
                    console.log(res?.data);
                    if (res?.data?.success) {
                        setCode(res?.data?.data?.code)
                        // setUrl('')
                        setValue('success')
                        setNetworkSuccess(res?.data?.message)

                    }
                }).catch((err) => {
                    console.log(err?.response?.data?.message)
                    setNetworkError(err?.response?.data?.message)
                })

            } catch (error) {
                console.log(error);
                setNetworkError(err?.response?.data?.message)
            }
        }
    }

    function isValidURL(url) {
        var urlRegex = new RegExp(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-\/]*)*(\?[^\s]*)?$/);
        setError(urlRegex.test(url))
        console.log(urlRegex.test(url));
        return url
    }

    const [mode, setMode] = useState("")
    function fetch() {
        if (verifiedCode.length > 0) {
            try {
                const res = axios.post('/api/get_url', { code: verifiedCode })
                res.then((res) => {
                    console.log(res?.data);
                    if (res?.data?.success) {
                        setCode(res?.data?.data?.url)
                        // setVerifiedCode('')
                        setNetworkSuccess(res?.data?.message)

                        if (mode === "in") {
                            setValue('successCode')
                            setMode("")
                        }
                        if (mode === "out") {
                            window.open(res?.data?.data?.url, '_blank');
                            setMode("")
                        }
                    }
                }).catch((err) => {
                    console.log(err?.response?.data?.message)
                    setNetworkError(err?.response?.data?.message)
                })
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    function increaseDownloadCount() {
        if (localStorage.getItem('download') === null) {
            localStorage.setItem('download', 1)
        } else {
            localStorage.setItem('download', parseInt(localStorage.getItem('download')) + 1)
        }
    }


    function increaseShareCount() {
        if (localStorage.getItem('share') === null) {
            localStorage.setItem('share', 1)
        } else {
            localStorage.setItem('share', parseInt(localStorage.getItem('share')) + 1)
        }
    }


    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([code], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "your-code.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const [status, setStatus] = useState('Code');


    const [popUp, setPopUp] = useState('publisher');



    const [f, setF] = useState(false)

    useEffect(() => {
        if (f) {
            fetch()
        } else {
            setF(true)
        }
    }, [mode])


    return (
        <div className='h-[100vh] text-[#202124] font-sans  flex bg-[#F0F4F9] items-center justify-center flex-col'>



            {
                value === 'link' && (

                    <div className="container">
                        <div className="row">
                            <img src="./image/final-logo.png" alt="Google Logo" />
                            <h1>Enter Website Link</h1>
                        </div>
                        <div className="row">
                            <h1>Enter Website Link To Create Code</h1>

                            <div style={{ position: 'relative' }}>
                                <input value={url} onChange={(e) => setUrl(isValidURL(e.target.value))}
                                    className={`${!error ? 'outline-red-500' : ' outline-blue-200'} mb-4`} type="text"
                                    placeholder="https://accounts.google.com/"></input>
                            </div>
                            <div className="button-style">
                                <Link href={'/code'}>Create new code</Link>

                                <button onClick={handleSubmitLINK} className="btn">Get Code</button>
                            </div>
                        </div>

                    </div>
                )
            }

            {
                value === 'code' && (
                    <div className='card flex flex-col gap-3'>
                        <p className='text-black'><strong>Enter Code a Long Link</strong></p>
                        <input onChange={(e) => setVerifiedCode(e.target.value)} className="p-2 border outline-blue-200 mb-4 border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500" type="text"
                            placeholder="1121*******221"></input>


                        <div>
                            <button onClick={() => document.getElementById('my_modal_2').showModal()} className='rounded mt-3 bg-[#4702D4] py-2 text-xl px-7 text-white '>
                                Submit
                            </button>
                        </div>
                    </div>
                )
            }


            {
                value === 'success' && (
                    <div className='card bg-[#F7F4FD] flex flex-col gap-3 items-center'>

                        <div className='text-white bg-[#4702D4] sm:text-4xl p-4 rounded-xl font-serif'>
                            Code Generated
                        </div>


                        <p onClick={() =>
                            navigator.clipboard.writeText(code).then(() => {
                                alert('Code Copied')
                            }).catch((err) => {
                                console.log(err)
                            })}
                            className='p-4 rounded-xl shadow  cursor-pointer  text-2xl text-gray-700 bg-white font-serif min-w-[100px] sm:w-[300px] flex items-center mt-[20px] justify-center'>
                            {code}
                        </p>

                        <div className='flex gap-3 flex-wrap sm:gap-[150px] sm:text-2xl select-none'>
                            <p className='p-4 rounded-xl cursor-pointer font-bold shadow   text-gray-700 bg-white font-serif sm:w-[300px] flex gap-2 items-center mt-[20px] justify-center'
                                onClick={() => { setStatus('Code'), setValue("sharecode"), increaseShareCount() }}>
                                <img src="/share.png" alt="Logo" /> Share Code
                            </p>


                            <p className='p-4 rounded-xl shadow cursor-pointer  font-bold   text-gray-700 bg-white font-serif sm:w-[300px] flex gap-2 items-center mt-[20px] justify-center'
                                onClick={() => { setStatus('Code'), setValue("downloadcode"), increaseDownloadCount(), downloadTxtFile() }}>
                                <img src="/download.png" alt="Logo" />  Save Code
                            </p>
                        </div>

                        <div className='flex gap-4 sm:gap-[400px] mb-6'>
                            <div className='bg-[#4702D4] text-white  w-10 h-10 flex justify-center items-center  rounded-full '>
                                {localStorage.getItem('share') ?? 0}
                            </div>

                            <div className='bg-[#4702D4] text-white  w-10 h-10 flex justify-center items-center  rounded-full '>
                                {localStorage.getItem('download') ?? 0}
                            </div>
                        </div>



                    </div>
                )
            }


            {
                value === 'sharecode' && (
                    <div className='card bg-[#F7F4FD] grid grid-cols-2 sm:grid-cols-4 gap-3 '>



                        <a target='_blank' href={`https://www.facebook.com/sharer/sharer.php?u=${code}`} onClick={() => setValue("downloadcode")}>
                            <figure><img src="img/facebook.png" alt="img" /></figure>
                        </a>

                        <TwitterShareButton url={code} >
                            <figure onClick={() => setValue("downloadcode")}><img src="img/twtter.png" alt="img" /></figure>
                        </TwitterShareButton>



                        <a target='_blank' href={`https://www.pinterest.com/pin/create/button/?url=${code}`} onClick={() => setValue("downloadcode")}>
                            <figure><img src="img/pinterst.png" alt="img" /></figure>
                        </a>

                        <LinkedinShareButton url={code} >
                            <figure onClick={() => setValue("downloadcode")}><img src="img/linkdin.png" alt="img" /></figure>
                        </LinkedinShareButton>

                        {/* <a target='_blank' href="https://www.linkedin.com/shareArticle?url=[URL]" onClick={() => setValue("downloadcode")}>
                        <figure><img src="img/linkdin.png" alt="img" /></figure>
                    </a> */}

                        <TelegramShareButton url={code}  >
                            <figure onClick={() => setValue("downloadcode")}><img src="img/share.png" alt="img" /></figure>
                        </TelegramShareButton>


                        <a target='_blank' href={`https://www.facebook.com/sharer/sharer.php?u=${code}`} onClick={() => setValue("downloadcode")}>
                            <figure><img src="img/message.png" alt="img" /></figure>
                        </a>

                        <WhatsappShareButton url={code}  >
                            <figure onClick={() => setValue("downloadcode")}><img src="img/whatsupp.png" alt="img" /></figure>
                        </WhatsappShareButton>


                        <WhatsappShareButton url={code}  >
                            <figure onClick={() => setValue("downloadcode")}><img src="img/chat.png" alt="img" /></figure>
                        </WhatsappShareButton>
                    </div>
                )
            }

            {
                value === 'downloadcode' && (
                    <div className='card bg-[#F7F4FD] flex flex-col gap-3 items-center'>

                        <img src="/img/success.gif" alt="Logo" width={100} />
                        <h1 className='text-[#212529] sm:text-4xl font-[1000] text-center sm:w-7/12'>Your {status} Have Been Saved Successfully Saved</h1>


                    </div>
                )
            }

            {
                value === 'successCode' && (
                    <div className='w-full bg-white shadow border rounded-xl shadow min-h-[80vh] sm:flex p-3'>


                        <iframe className='w-full min-h-full max-sm:h-[70vh]' src={code} frameBorder="0" allowFullScreen></iframe>
                        <div className='sm:h-full py-4 w-full sm:w-[200px] flex sm:flex-col justify-center gap-4'>
                            <p className='cursor-pointer flex flex-col  gap-2 items-center mt-[20px] justify-center'
                                onClick={() => { setStatus('Link'), setValue("sharecode"), increaseShareCount() }}>
                                <img src="/share.png" alt="Logo" /> Share Link
                            </p>


                            <p className='cursor-pointer flex flex-col  gap-2 items-center mt-[20px] justify-center'
                                onClick={() => { setStatus('Link'), setValue("downloadcode"), increaseDownloadCount(), downloadTxtFile() }}>
                                <img src="/download.png" alt="Logo" />  Save Link
                            </p>

                        </div>

                    </div>

                )
            }


        </div>
    )
}

export default Contant