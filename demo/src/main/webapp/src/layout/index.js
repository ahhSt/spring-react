import React from "react";
import Header from './header'
import Footer from './footer'
import { Outlet } from 'react-router'
// import { LayoutDefaultProps } from '@types'


interface LayoutDefaultProps {
  children ?: React.ReactElement;
}

const mainStyle = {
    backgroundColor: "lightgreen",
    padding: 40,
    color: "white",
    height: "100%"
}

export default function DefaultLayout({children}:LayoutDefaultProps) {
  return (
    <div
        style={{
                  marginLeft: 60
              }}
    >
      <Header/>
        {/* Content 영역 */}
        <main style={ mainStyle } >
          {/* children이 있을경우는 children을 없을 경우에는 Outlet을 나타내준다 */}
          {children || <Outlet/>}
          TEST
        </main>
      <Footer/>
    </div>
  )
}
