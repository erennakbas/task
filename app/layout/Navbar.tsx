"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { TabMenu, TabMenuTabChangeEvent } from 'primereact/tabmenu';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const [activeIndex, setActiveIndex] = useState(1); //index for selecting the active tab
    const router = useRouter();
    const pathname = usePathname();
    const onTabChange=(e:TabMenuTabChangeEvent)=>{
      setActiveIndex(e.index)
      router.push(items[e.index].id)
    }
    useEffect(()=>{
      setActiveIndex(items.findIndex((i)=> i.id === pathname)) //find active tab index when the navbar component is mounted
    }, [])
    const items = [
        {id:"/", label: 'Home' , icon: 'pi pi-fw pi-home'},
        {id:'/users', label: 'Users Table', icon: 'pi pi-fw pi-calendar'},
    ];
  return (
    <TabMenu model={items} activeIndex={activeIndex} onTabChange={onTabChange} />
  )
}

export default Navbar