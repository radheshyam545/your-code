import React from 'react';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-[#4702D4] text-white text-[15px]  py-[50px] flex justify-center w-full">
            <div className="sm:w-9/12 p-3 ">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <div className="">
                            <img src="/white-logo.png" alt="Logo" className="w-[150px] mb-3" />
                            <p>YourCode brings you the chance to easily create, shorten and manage any URL to help you cross-promote your brands & products</p>
                            <ul className="flex gap-2 mt-2 items-center">
                                <li> <Image src="/img/icons8-facebook-24.png" alt="facebook" width={20} height={20} /></li>
                                <li> <Image src="/img/icons8-instagram-24.png" alt="facebook" width={20} height={20} /></li>
                                <li> <Image src="/img/icons8-linkedin-48.png" alt="facebook" width={20} height={20} /></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold text-xl">Products</div>
                        <ul className="mt-2">
                            <li>Features</li>
                            <li>Pricing</li>
                            <li>Privacy Policy</li>
                            <li>Submit Request</li>
                        </ul>
                    </div>
                    <div>
                        <div className="font-semibold text-xl">Company</div>
                        <ul className="mt-2">
                            <li>About Us</li>
                            <li>Contact</li>
                            <li>Career</li>
                            <li>Affiliate</li>
                        </ul>
                    </div>
                    <div>
                        <div className="font-semibold text-xl">Get Help</div>
                        <ul className="mt-2">
                            <li>Support</li>
                            <li>Forums</li>
                            <li>Docs</li>
                            <li>Blog</li>
                        </ul>
                    </div>
                </div>

                <p className="text-center mt-6 text-[15px]">Copyright © 2024 | All Rights Reserved.</p>

            </div>
        </footer>
    );
};

export default Footer;
