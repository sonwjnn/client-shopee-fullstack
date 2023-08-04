import React from 'react'
import SearchMain from '../common/SearchMain'
import HeaderNavigate from '../common/HeaderNavigate'
import { useParams, useLocation } from 'react-router-dom'

const AppBar = () => {
  const location = useLocation()
  const { sign, productId, accountType, keyword, authCate } = useParams()
  const carts = location.pathname === '/user/carts'

  return (
    <>
      <div
        className={` header bg-gradient-to-b  from-bg_header_b to-bg_header_t  w-full  ${
          sign || carts ? 'hidden' : ''
        } ${
          productId ||
          accountType ||
          authCate ||
          keyword ||
          location.pathname.includes('account')
            ? 'relative'
            : ''
        } ${!sign && !productId ? 'fixed' : ''}
        `}
      >
        <div className="grid wide">
          <HeaderNavigate />
          <SearchMain />
        </div>
      </div>
    </>
  )
}

export default AppBar
