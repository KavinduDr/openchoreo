/* eslint-disable prettier/prettier */
 

import * as React from 'react';


export default function (props: React.SVGProps<SVGSVGElement>){
  return (
    <svg {...props}>
      <g><React.Fragment><g filter="url(#a)"><rect width="27.4286" height="27.4286" x="4" fill="url(#b)" rx="6" /><path fill="#F0F1F4" fillRule="evenodd" d="M41.2512 24.0028C39.6518 19.904 35.665 17 31 17c-6.0751 0-11 4.9249-11 11q.0001.512.0459 1.0119C15.5626 29.2479 12 32.9579 12 37.5c0 4.6944 3.8056 8.5 8.5 8.5H41c6.0751 0 11-4.9249 11-11 0-5.9912-4.7897-10.8637-10.7488-10.9972" clipRule="evenodd" /><path stroke="#40404B" strokeLinecap="round" strokeWidth="1.5" d="M27.1429 23.1429 14.7143 10.7143M27.2856 23.2857l10 10M20.7143 10.2857h-6.4286v6.4286M28.7144 33.7143h9v-9" /></g><defs><filter id="a" width="56" height="56" x="0" y="0" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset dy="4" /><feGaussianBlur stdDeviation="2" /><feComposite in2="hardAlpha" operator="out" /><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" /><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_569_28986" /><feBlend in="SourceGraphic" in2="effect1_dropShadow_569_28986" result="shape" /></filter><linearGradient id="b" x1="17.7143" x2="17.7143" y1="0" y2="19.9481" gradientUnits="userSpaceOnUse"><stop stopColor="#D8D8D8" /><stop offset="1" stopColor="white" /></linearGradient></defs></React.Fragment></g>
    </svg>
  )
}
    

