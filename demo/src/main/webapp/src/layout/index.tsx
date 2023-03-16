import React from "react";

import Header from './header'
import Footer from './footer'
import { Outlet } from 'react-router'
// import { LayoutDefaultProps } from '@types'


interface LayoutDefaultProps {
  children ?: React.ReactElement;
}


export default function DefaultLayout({children}:LayoutDefaultProps) {
  return (
    <div>
      <Header/>
        {/* Content 영역 */}
        <main>
          {/* children이 있을경우는 children을 없을 경우에는 Outlet을 나타내준다 */}
          {children || <Outlet/>}
        </main>
      <Footer/>
    </div>
  )
}