

function Navigation() {
    return (
        <div className='bg-[#4702D4] min-h-[60px] w-full flex justify-center items-center'>
            <div className="sm:w-9/12">
                <div className="flex justify-between items-center ">
                    <div className="logo">
                        <a href="/"><img src="/white-logo.png" alt="Logo" width={200} /></a>
                    </div>
                    <div className="max-sm:hidden">
                        <ul className="flex gap-4 text-white">
                            <li>HOME</li>
                            <li name="features" className="flex items-center relative">FEATURES   <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>

                                <div className="features absolute top-[25px] rounded-xl left-0 min-w-[160px]  bg-white border text-center text-gray-500">
                                    <div>Action</div>
                                    <div>Action</div>
                                    <div className="border border-t-2">Action</div>
                                </div>
                            </li>
                            <li>PRICING </li>
                            <li>BLOG</li>
                            <li name="resources" className="flex items-center relative">RESOURCES  <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                                <div className="resources absolute top-[25px] rounded-xl left-0 min-w-[160px]  bg-white border text-gray-500 text-center">
                                    <div>Action</div>
                                    <div>Action</div>
                                    <div>Action</div>
                                </div>
                            </li>

                        </ul>
                    </div>

                    <div className="sm:hidden">

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Navigation