'use client'

import { useContext, useEffect, useState } from "react";
import Extension from "./extension";
import { AppContext } from "./Context";
import { AnimatePresence,motion } from "framer-motion";

const Switch = () => {
    const {query} = useContext(AppContext)
    const [activeTab,setActiveTab] = useState('All')
    const [extension,setExtension] = useState([])
    const [delshow,setDelShow] = useState(false)
        useEffect(()=>{
            try {
                fetch('/data.json')
                .then(res => res.json())
                .then((data)=>{
                    setExtension(data)
                })
                .catch((error)=>{
                    throw error
                })
                
            } catch (error) {
                console.log(error?.message)
            }
        },[])

    return ( 
        <div className="w-full flex flex-col gap-8 ">
            <div className="flex flex-col md:flex-row gap-5 items-center justify-between w-full ">
                <div className="text-2xl lg:text-4xl font-semibold">
                    Extensions List
                </div>
                <div className="flex gap-5 ">
                    <div className={` ${activeTab === 'All' && 'bg-red-400 text-[#212636] hover:bg-red-500 font-semibold'} focus:outline-1 focus:outline-red-400 hover:bg-[#656b7e] rounded-full bg-[#545969]  cursor-pointer py-2 px-5  `} onClick={()=>setActiveTab('All')} >All</div>
                    <div className={` ${activeTab === 'Active' && 'bg-red-400 text-[#212636] hover:bg-red-500 font-semibold'} focus:outline-1 focus:outline-red-400 hover:bg-[#656b7e] rounded-full bg-[#545969]  cursor-pointer py-2 px-5  `} onClick={()=>setActiveTab('Active')} >Active</div>
                    <div className={` ${activeTab === 'Inactive' && 'bg-red-400 text-[#212636] hover:bg-red-500 font-semibold'} focus:outline-1 focus:outline-red-400 hover:bg-[#656b7e] rounded-full bg-[#545969]  cursor-pointer py-2 px-5  `} onClick={()=>setActiveTab('Inactive')} >Inactive</div>
                </div>
            </div>
            <AnimatePresence>
                {query && <motion.p className=""
                initial={{opcaity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.3}}
                >Search Rresult for: {query} </motion.p>}
            </AnimatePresence>
            {query && <Extension delshow={delshow} setDelShow={setDelShow} setExtension={setExtension} extension={extension.filter(item =>item?.description?.toLowerCase().includes(query.toLowerCase()) || item?.name?.toLowerCase().includes(query.toLowerCase()))} />}
            {activeTab === 'All' && 
            <Extension delshow={delshow} setDelShow={setDelShow} setExtension={setExtension} extension={extension} />
            }
            {activeTab === 'Active' && 
            <Extension delshow={delshow} setDelShow={setDelShow} setExtension={setExtension} extension={extension.filter(item => item.isActive === true )} />
            }
            {activeTab === 'Inactive' && 
            <Extension delshow={delshow} setDelShow={setDelShow} setExtension={setExtension} extension={extension.filter(item => !item.isActive)} />
            }
        </div>
     );
}
 
export default Switch;