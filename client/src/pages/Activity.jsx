import React from "react";
import '../App.css'
import { Navigate } from "react-router-dom";
import Bg from '../assets/bg';
import Navbar from '../assets/Navbar';
import { Button, Input } from "antd";

const Activity = () => {
    const check = true;

    if (!check) {
        // หากไม่มี check ให้เปลี่ยนเส้นทางไปหน้า login
        return <Navigate to="/login" />;
    } 
    return (
        <Bg>
            <Navbar/>
            {/* main content*/}
            <div className="container mx-auto px-4 py-6 flex gap-6 pt-[100px]">
                {/*Sidebar*/}
                <aside className="w-64 flex-shrink-0">
                    <button className="w-full bg-orange h0ver:bg-orange-light text-white mb-6" size='lg'>
                        {/* <Plus className='mr-2 h-4 w-4'/>New Activity */}
                    </button>
                    
                    <div className="space-y-4">
                        <div className="relative">
                            <search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                            <Input 
                            className='pl-10 bg-navy-dark border-gray-700 text-white'
                            placeholder="Search tags"
                            />
                        </div>

                        <div className="space-y-2">
                            <button className="w-full text-left px-3 py-2 rounded hover:bg-navy-dark text-gray-300 hover:text-white transition-colors">
                                Computer Engineering
                            </button>
                            <button className="w-full text-left px-3 py-2 rounded hover:bg-navy-dark text-gray-300 hover:text-white transition-colors">
                                Chemical Engineering
                            </button>
                            <button className="w-full text-left px-3 py-2 rounded hover:bg-navy-dark text-gray-300 hover:text-white transition-colors">
                                Information Technology
                            </button>
                            <button className="w-full text-left px-3 py-2 rounded hover:bg-navy-dark text-gray-300 hover:text-white transition-colors">
                                Engineering
                            </button>
                        </div>
                    </div>
                </aside>

                 {/* Content */}
                 <div className="flex-1">
                    <div className="flex gap-4 mb-6">
                        <div className="relative flex-1">
                            <search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                            <Input 
                            className="w-full pl-10 bg-navy-dark border-gray-700 text-white"
                            placeholder="Hinted search text"
                            />
                        </div>
                        <Button variant="outline" size="icon">
                            <filter className="h-4 w-4"/>
                        </Button>
                    </div>

                    {/* Event */}
                    <div className="space-y-4">
                        <div className="p-6 bg-navy-dark rounded-lg border bordor-gray-700">
                            <div className="flex item-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-orange flex item-center justify-center"/>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </Bg>
    )
}

export default Activity;