import ProductItem from './ProductItem'
import productApi from '../../apis/modules/product.api'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import {
  clearProductsStore,
  setProductsSortPrice,
  setProductsStore
} from '../../redux/features/productSlice'
import { setGlobalLoading } from '../../redux/features/globalLoadingSlice'
const ProductList = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { productType } = useParams()
  const { productsStore, productsSortPrice } = useSelector(
    state => state.products
  )
  const [products, setProducts] = useState([])
  const [productsSort, setProductsSort] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      dispatch(setGlobalLoading(true))
      dispatch(clearProductsStore())
      const { response, err } = await productApi.getList()

      dispatch(setGlobalLoading(false))

      if (err) toast.error(err.message)
      if (response) {
        setProducts(response)
      }
    }

    getProducts()
  }, [dispatch])

  useEffect(() => {
    if (products.length) {
      dispatch(
        setProductsStore(products.filter(item => item.type === productType))
      )
      setProductsSort(products)
    }
  }, [dispatch, productType, products])

  useEffect(() => {
    if (productsSortPrice) {
      if (productsStore.length) {
        dispatch(
          setProductsStore(
            productsSortPrice === 'upToDown'
              ? [...productsStore].sort((a, b) => +b.price - +a.price)
              : [...productsStore].sort((a, b) => +a.price - +b.price)
          )
        )
      } else {
        setProductsSort(
          productsSortPrice === 'upToDown'
            ? [...products].sort((a, b) => +b.price - +a.price)
            : [...products].sort((a, b) => +a.price - +b.price)
        )
      }
    }
  }, [productsSortPrice])

  useEffect(() => {
    dispatch(setProductsSortPrice(null))
  }, [location])

  return (
    <div className="home-product home-product--spacing-bottom min-h-screen">
      <div className="row sm-gutter relative">
        {/* <!-- Product item --> */}
        {(productsStore.length ? productsStore : productsSort).map(product => (
          <ProductItem
            key={product._id}
            id={product._id}
            title={product.name}
            price={product.price}
            imageName={product.imageName}
            info={product.info}
            date={product.producedAt}
            origin={product.origin}
            type={product.type}
            isFavorite={product.isFavorite}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductList
