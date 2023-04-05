import React from "react";

/**
 * 기본 Header
 */
export default function DefaultHeader() {
  return (
    <header
        style={{
                  backgroundColor: "green",
                  padding: 20,
                  color: "white",
              }}
    >
      <div>기본 Header 영역</div>
    </header>
  )
}