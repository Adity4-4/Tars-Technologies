import React from 'react'
import HeroSection from '../components/commoncomponents/HeroSection'
import Products from '../components/commoncomponents/Products'
import GetinTouch from '../components/commoncomponents/GetinTouch'

function ProductPage() {
  return (
    <>
      <HeroSection
        heading='PRODUCT'
        description='At Tars Technology, our products reflect the perfect blend of creativity and engineering. From concept to execution, we design solutions that deliver impact, efficiency, and long-term value for your success.'
        section='#nextsection'
      />
      <div id='nextsection'>
        <Products />
      </div>
      <GetinTouch />
    </>
  )
}

export default ProductPage
