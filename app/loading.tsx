"use client"

import { LoadingTyper } from "@/components/LoadingTyper";

function loading() {
  
  return (
    <div>
        <div>
            <div className="w-[100vw] h-[100vh]">
                <div className="flex justify-center items-center h-full">
                    <div className="text-center">
                        {/* <h1 className="text-5xl font-bold text-gray-300 dark:text-gray-100">Loading...</h1> */}
                        <LoadingTyper/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default loading ;