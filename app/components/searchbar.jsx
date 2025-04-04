'use client'
import Image from "next/image";
import { useContext } from "react";
import { AppContext } from "./Context";

const SearchBar = () => {
    const {setQuery,query,bg,setBg} = useContext(AppContext)
    return ( 
        <form onSubmit={(e)=>e.preventDefault()} action="" className={`${bg === 'sun' && 'bg-[#ededed]' } bg-[#212636] w-full shadow-lg py-1 rounded-lg border-white border px-3 flex items-center justify-between `}>
            <label htmlFor="input" className="text-white">
                <Image src='/assets/images/logo.svg' alt="" width={150} height={50} />
            </label>
            <input value={query} onChange={(e)=>setQuery(e.target.value)} type="text" className="flex p-3 items-center justify-start focus:outline-none w-full " name="" id="input" />
            <div  className="bg-[#545969] cursor-pointer rounded-md p-2">
                {bg === 'sun' && <Image onClick={()=>setBg('moon')} src='/assets/images/icon-moon.svg' alt="" width={30} height={30} /> }
                { bg === 'moon' && <Image onClick={()=>setBg('sun')} htmlFor='input' src='/assets/images/icon-sun.svg' className="object-cover" alt="" width={30} height={30} />}
            </div>
        </form>
    );
}
 
export default SearchBar;