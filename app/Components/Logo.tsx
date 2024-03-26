import Link from 'next/link'
import React from 'react'

export default function Logo() {
  return (
    <div>
        <Link href={"/"} className='text-xl md:text-2xl font-bold italic'> Fashion App </Link>
    </div>
  )
}
