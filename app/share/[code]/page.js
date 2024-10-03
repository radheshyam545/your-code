"use client"
import { useState } from 'react';
import Link from 'next/link';


export default function Home({ params }) {

    const { code } = params



    return (
        <div className='h-[100vh] font-bold text-[#202124] font-sans  flex bg-[#F0F4F9] items-center justify-center flex-col'>




            <div className='flex rounded-2xl bg-white flex-wrap gap-[30px] items-center bg-white w-[70%] p-5 justify-center'>

                <a className='bg-white ' href={`https://wa.me/?text=Your%20Code%20is:${code}`}
                    target="_blank">
                    <img src="/img/whatsapp.png" alt="img" className='w-[60px]' />
                </a>
                <a className='bg-white pl-4' href={`mailto:?subject=Your%20Code&body=Your%20Code%20is:${code}`}
                    target="_blank" >
                    <img src="/img/mail.png" alt="img" className='w-[70px]' />
                </a>

                <a className='bg-white' href={`fb-messenger://share/?link=Your%20Code%20is:${code}`}
                    target="_blank" >
                    <img src="/img/message.png" alt="img" className='w-[100px]' />
                </a>
            </div>



        </div>

    );
}
