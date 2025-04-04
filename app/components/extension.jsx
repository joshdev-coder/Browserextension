'use client'
import Image from "next/image";
import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppContext } from "./Context";
const Extension = ({extension,setExtension,setDelShow,delshow}) => {
    const {bg} = useContext(AppContext)
    const [items,setItem] = useState(null)
    const [number,setNumber] = useState(null)
    const activeToggle = (item)=>{
        setExtension(prev => prev.map((itm,indx) => itm === item ? {...itm,isActive: !itm.isActive}: itm ))
    }
    const promptDel = (item)=>{
        setDelShow(prev => !prev)
        setItem(item)
    }
    const delItem = (item)=>{
        setExtension(prev => prev.filter((itm,indx) => itm !== item))
        setDelShow(false)
        setItem(null)
    }
    return ( 
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 w-full items-center justify-center gap-3 text-xs sm:text-sm ">
            {extension?.map((item,index)=>(
                <AnimatePresence mode="wait" key={index}>
                    <motion.div className={`${bg === 'sun' && 'bg-[#ededed] border-[#c7c7c7] text-[#212636]'} bg-[#212636] border-[0.5px] border-[#c7c7c7] p-5 rounded-lg flex flex-col gap-5`} key={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5,delay: index*0.3}}
                    exit={{y: -20}}
                    >
                        <div className="flex gap-3 items-start justify-center ">
                            <Image src={item?.logo} alt='logo' width={50} height={50} />
                            <div className="relative flex flex-col gap-3">
                                <h1 className="font-semibold text-lg ">{item?.name}</h1>
                                <motion.p className="line-clamp-2 cursor-pointer "
                                    onHoverStart={()=>setNumber(index)}
                                    onHoverEnd={()=>setNumber(null)}
                                >{item?.description}</motion.p>
                                { number === index && <p className="bg-transparent backdrop-blur-sm z-20 shadow rounded-md text-black/80 p-2  absolute top-0">{item?.description}</p>}
                            </div>
                        </div>
                        <div className="flex items-center justify-between relative ">
                            <AnimatePresence mode="wait">
                                { delshow && items === item &&
                                        <motion.div className=" text-xs overflow-hidden flex flex-col bg-white text-[#212636] items-center justify-center z-10 shadow left-24 absolute rounded-md "
                                        initial={{opacity: 0,scale: 1.1}}
                                        animate={{opacity: 1,scale: 0.9}}
                                        transition={{duration: 0.3}}
                                        exit={{opacity: 0,scale: 1.1}}
                                        >
                                                <div onClick={()=>setDelShow(false)} className="cursor-pointer w-full px-3 py-2 hover:bg-[#F6F7F9] ">No</div>
                                                <div onClick={()=>delItem(items)} className="cursor-pointer w-full px-3 py-2 hover:bg-[#F6F7F9] ">Yes</div>
                                        </motion.div>
                                }
                            </AnimatePresence>
                            <div onClick={()=>promptDel(item)} className="px-5 py-1 hover:bg-red-400 hover:text-[#212636] rounded-full border cursor-pointer ">Remove</div>
                            <div className="">
                                <div onClick={()=>activeToggle(item)} className={` ${item?.isActive && 'bg-red-400 justify-end hover:bg-red-500 '} duration-1000 hover:bg-[#454e6b] cursor-pointer flex transition-all items-center py-2 px-1 bg-[#545969] rounded-full w-[60px] `}>
                                    <div className={`w-[20px] h-[20px] rounded-full bg-white `}></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            ))}
        </div>
     );
}
 
export default Extension;