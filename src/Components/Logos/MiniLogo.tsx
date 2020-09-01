import React, { useEffect } from 'react'
import anime from 'animejs'


export default function MiniLogo() {
  useEffect(()=>{
    anime({
      targets:".MiniLogoDiv .MiniLogoSVG path",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1500,
      delay: function(el, i) { return i * 250 },

    })
  })
  return (
    <div className="MiniLogoDiv">
      <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="MiniLogoSVG">
        <mask id="path-1-inside-1" fill="white"> <path fill-rule="evenodd" clip-rule="evenodd" d="M200 380C299.411 380 380 299.411 380 200C380 100.589 299.411 20 200 20C100.589 20 20 100.589 20 200C20 299.411 100.589 380 200 380ZM200 400C310.457 400 400 310.457 400 200C400 89.5431 310.457 0 200 0C89.5431 0 0 89.5431 0 200C0 310.457 89.5431 400 200 400Z"/>
        </mask>
        <path d="M360 200C360 288.366 288.366 360 200 360V400C310.457 400 400 310.457 400 200H360ZM200 40C288.366 40 360 111.634 360 200H400C400 89.5431 310.457 0 200 0V40ZM40 200C40 111.634 111.634 40 200 40V0C89.5431 0 0 89.5431 0 200H40ZM200 360C111.634 360 40 288.366 40 200H0C0 310.457 89.5431 400 200 400V360ZM380 200C380 299.411 299.411 380 200 380V420C321.503 420 420 321.503 420 200H380ZM200 20C299.411 20 380 100.589 380 200H420C420 78.4974 321.503 -20 200 -20V20ZM20 200C20 100.589 100.589 20 200 20V-20C78.4974 -20 -20 78.4974 -20 200H20ZM200 380C100.589 380 20 299.411 20 200H-20C-20 321.503 78.4974 420 200 420V380Z" fill="#1C6E8C" mask="url(#path-1-inside-1)"/>
        <path d="M153.918 125.812L200.402 241.828L246.887 125.812H271.203V268H252.453V212.629L254.211 152.863L207.531 268H193.176L146.594 153.156L148.449 212.629V268H129.699V125.812H153.918Z" stroke="#1C6E8C" stroke-opacity="0.45" stroke-width="8"/>
      </svg>



    </div>

  )
}