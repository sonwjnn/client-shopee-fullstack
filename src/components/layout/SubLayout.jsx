import ProductType from '../common/ProductType'
import BoardBar from '../common/BoardBar'
import Pagination from '../common/Pagination'
import productConfigs from '../../configs/product.configs'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setProductsSortPrice } from '../../redux/features/productSlice'

const SubLayout = () => {
  return (
    <>
      <div className="app__container">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex sm-gutter pt-0 lg:pt-[36px] app__content">
            <div className="col hidden md:block">
              <ProductType />
            </div>

            <div className="col col-span-10 overflow-hidden grow">
              {/* <ProductList /> */}
              <Outlet />
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubLayout
