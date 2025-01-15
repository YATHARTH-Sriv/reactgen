"use client"

import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useSession } from 'next-auth/react'
import axios from 'axios'


interface userdatatype{
    email:string,
    name:string,
    image:string
}
interface componentHistoryType {
    id: number;
    prompt: string;
    published: boolean;
    authorId: number;
}

export function Settings() {
    const [userData, setuserData] = useState<userdatatype>()
    const [history,sethistory]=useState<componentHistoryType[]>()
    const {data:session}=useSession()
    useEffect(() => {
      const fetchdata=async ()=>{
        const res=await axios.post("/api/userdata",{email:session?.user?.email})
        console.log(res.data)
        setuserData(res.data)
        sethistory(res.data.promptHistory)

      }
        fetchdata()
    }, [])
    
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {userData ?<Card className="max-w-2xl mx-auto bg-gray-950 border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl text-white font-bold">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={userData.image} alt="User" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className=' text-white text-lg'>Name</p>
              <p className="bg-gray-900 m-2 p-2 border-gray-800 text-white" >{userData.name}</p>
            </div>
            <div className="space-y-2">
            <p className=' text-white text-lg'>Email</p>
              <p className="bg-gray-900 m-2 p-2 border-gray-800 text-white" >{userData.email}</p>
            </div>
          </div>

          <Separator className="bg-gray-800" />

          { history && history &&<div>
            <h3 className="text-lg font-semibold text-white mb-4">Component History</h3>
            <div className="space-y-4">
              {history.map((component) => (
                <div key={component.id} className="flex justify-between items-center bg-gray-900 p-3 rounded-md">
                  <span>{component.prompt.slice(0,10)}</span>
                  <span className="text-gray-400 text-sm">{component.id}</span>
                </div>
              ))}
            </div>
          </div>}

          <div className="pt-4">
          </div>
        </CardContent>
      </Card> : <div className=' text-white text-5xl'>Please Wait...</div>}
    </div>
  )
}

