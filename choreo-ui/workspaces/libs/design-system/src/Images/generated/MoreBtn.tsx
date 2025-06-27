/* eslint-disable prettier/prettier */
 

import * as React from 'react';


export default function (props: React.SVGProps<SVGSVGElement>){
  return (
    <svg {...props}>
      <g><React.Fragment><defs><linearGradient id="b" x1=".5" x2=".5" y2="1" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#f7f8fb" /></linearGradient><filter id="a" width="35" height="35" x="0" y="0" filterUnits="userSpaceOnUse"><feOffset dy="1" /><feGaussianBlur result="blur" stdDeviation=".5" /><feFlood floodColor="#cbcfda" /><feComposite in2="blur" operator="in" /><feComposite in="SourceGraphic" /></filter></defs><g data-name="Button/Close/Default"><g filter="url(#a)" transform="translate(1.5 .5) translate(-1.5 -.5)"><circle cx="16" cy="16" r="16" fill="url(#b)" data-name="Oval Copy 15" transform="translate(1.5 .5)" /></g><path fill="#8d91a3" d="M7.465 7.365a1 1 0 0 1 0-1.415l1.12-1.121H1a1 1 0 0 1 0-2h7.586L7.465 1.707A1 1 0 1 1 8.878.293l2.657 2.657a1 1 0 0 1 .278.879 1 1 0 0 1-.278.878L8.878 7.365a1 1 0 0 1-1.414 0Z" data-name="Combined Shape" transform="translate(1.5 .5) translate(9 12.172)" /></g></React.Fragment></g>
    </svg>
  )
}
    

