'use client'
import { useContext } from "react";
import SearchBar from "./components/searchbar";
import Switch from "./components/swichTab";
import { AppContext } from "./components/Context";

export default function Home() {
  const {bg} = useContext(AppContext)
  return (
    <div className={` ${bg === 'sun' && 'bg-[#d6e2f5]'  } bg-[#09153e] w-full flex gap-8 flex-col text-white items-center justify-center`}>
      <div className="mx-5 sm:mx-10  md:mx-32 flex flex-col gap-8 py-3 ">
        <SearchBar />
        <Switch />
      </div>
    </div>
  );
}
