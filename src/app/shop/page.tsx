import ShopComponent from '@/components/Shop/ShopComponent'
import React from 'react'
import { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={null}>
      <ShopComponent/>
    </Suspense>
  )
}

export default page