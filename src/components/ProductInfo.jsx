import cartApi from '@/services/api/modules/cart.api'
import { addCart } from '@/services/redux/features/userSlice'
import { formatPriceToVND } from '@/utils/formatting'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { BsTruck } from 'react-icons/bs'
import { LuMinus, LuPlus, LuShoppingBag } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import LikeButton from './common/LikeButton'
import Star from './common/Star'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Skeleton } from './ui/skeleton'

const ProductInfo = props => {
  const { product, favoriteCount, reviewCount } = props
  const { user, listCarts } = useSelector(state => state.user)
  const [onRequest, setOnRequest] = useState(false)
  const [cartValue, setCartValue] = useState(1)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onCartClick = async () => {
    if (!user) {
      toast.error('You must login first!', { toastId: 'warning-login' })
      navigate('/auth/signin')
      return
    }
    if (onRequest) return

    setOnRequest(true)

    let newCartValue = cartValue
    if (listCarts.length) {
      listCarts.map(cart => {
        if (cart.productId._id === product._id) {
          newCartValue = newCartValue + +cart.quantity
        }
      })
    }
    if (newCartValue > 50) newCartValue = 50

    const body = {
      productId: product._id,
      quantity: newCartValue,
    }

    const { response, err } = await cartApi.add(body)

    setOnRequest(false)

    if (err) toast.error(err.message)

    if (response) {
      dispatch(
        addCart({
          ...response,
          productId: { ...product },
        })
      )
      toast.success('Added cart!')
    }
  }

  const handleInputQuantity = e => {
    const value = e.target.value

    if (value < 1) {
      setCartValue(1)
    } else if (value > 50) {
      setCartValue(50)
    } else {
      setCartValue(+value)
    }
  }

  const onBuyClick = async () => {
    if (!user) {
      toast.error('You must login first!', { toastId: 'warning-login' })
      navigate('/auth/signin')
      return
    }
    await onCartClick()
    navigate('/user/carts')
  }
  return (
    <div className="rounded-md bg-white p-4">
      <div className="flex  flex-col gap-y-3 px-4">
        <div className="flex min-h-[46px] items-center ">
          {product ? (
            <span className="line-clamp-2 text-xl font-medium text-[#242424]">
              {product?.name}
            </span>
          ) : (
            <Skeleton className="h-[36px] w-[400px]" />
          )}
        </div>

        <div className="flex flex-wrap items-center  gap-4">
          {product ? (
            <>
              <span className="border-right-ab relative flex items-center after:right-[-2rem]">
                <span className="border-bottom-ab relative mr-2 text-base text-primary  after:bg-primary sm:text-lg">
                  {product?.rating}
                </span>

                <Star
                  stars={product?.rating}
                  className=" text-lg text-yellow-500"
                />
              </span>

              <span className="border-right-ab relative ml-[3rem] hidden items-center after:right-[-2rem] sm:flex">
                <span className="border-bottom-ab  relative mr-2 text-base after:bg-gray-500 sm:text-lg">
                  {reviewCount}
                </span>
                <span className="text-sm  text-gray-500">Đánh giá</span>
              </span>

              <span className="ml-[3rem] flex items-center ">
                <span className="border-bottom-ab  relative mr-2 text-base after:bg-gray-500 sm:text-lg">
                  {product?.sold}
                </span>
                <span className="text-sm  text-gray-500">Đã bán</span>
              </span>

              <span className="4 flex items-center gap-8 sm:hidden">
                <div className="flex items-center gap-x-2">
                  <LikeButton product={product} />
                  <span className="text-base capitalize">
                    đã thích ({favoriteCount})
                  </span>
                </div>
              </span>
            </>
          ) : (
            <Skeleton className="h-[20px] w-[300px]" />
          )}
        </div>
      </div>

      {product ? (
        <div className="mt-5  bg-[#fafafa] p-6 ">
          <div className="flex flex-wrap gap-4">
            <span className="flex items-start text-base font-normal text-neutral-400 line-through">
              {formatPriceToVND(product?.price)}
            </span>

            <span className="flex items-start text-3xl font-medium text-[#242424]">
              {formatPriceToVND(product?.discountPrice)}
            </span>
            {product?.discount !== '0' && (
              <div className="flex items-center">
                <span className="tag-shopee bg-primary py-0  text-xs font-bold uppercase text-white">
                  {product?.discount}% giảm
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div
              className="aspect-square h-6 w-6 bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url(/images/logos/sale.png)`,
              }}
            ></div>

            <div className="flex flex-col flex-wrap items-start justify-center">
              <div className="flex gap-4">
                <span className="text-base font-normal text-primary">
                  Gì cũng rẻ
                </span>
              </div>

              <span className="text-sm text-gray-500">
                Giá tốt nhất so với các sản phẩm cùng loại trên Shop!
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 py-3">
          <Skeleton className="h-[120px] w-full" />
        </div>
      )}

      <div className="p-4 ">
        {product ? (
          <>
            <div className="flex gap-4 py-3 capitalize">
              <span className="mdock hidden w-[120px] text-sm font-medium text-[#242424]">
                deal sốc
              </span>
              <span className="tag-shopee bg-[#ffeee8] font-normal text-primary">
                mua kèm deal sốc
              </span>
            </div>

            <div className="flex flex-wrap gap-4 py-3 text-sm">
              <span className="mt-1 hidden w-[120px] font-medium capitalize text-[#242424] md:block">
                vận chuyển
              </span>
              <span>
                <div className="flex gap-4 py-2">
                  <div
                    className="h-6 w-6 bg-cover bg-no-repeat"
                    style={{
                      backgroundImage: `url(/images/logos/free-ship.png)`,
                    }}
                  ></div>
                  <p className="first-letter:uppercase">miễn phí vận chuyển</p>
                </div>
                <div className="flex gap-4 capitalize">
                  <BsTruck className="fa-solid fa-truck mr-1 mt-2 text-xl" />
                  <span className="flex flex-col">
                    <div className="hidden items-center gap-4 py-2 md:flex">
                      <span className="text-gray-500 ">vận chuyển tới</span>
                      <span>
                        {`${user?.district || ''}, ${user?.citya || ''}`}
                        {/* <i className="ti-angle-down ml-2"></i> */}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 py-2 ">
                      <span className="text-sm text-gray-500">
                        phí vận chuyển
                      </span>
                      <span className="flex">₫0</span>
                    </div>
                  </span>
                </div>
              </span>
            </div>
          </>
        ) : (
          <div className="mb-6 flex flex-col gap-y-6">
            <Skeleton className="h-[20px] w-[200px]" />
            <Skeleton className="h-[20px] w-[300px]" />
            <Skeleton className="h-[80px] w-[220px]" />
            <Skeleton className="h-[20px] w-[200px]" />
          </div>
        )}

        {product ? (
          <div className="mt-4 flex flex-col flex-wrap gap-4 py-3 capitalize md:flex-row">
            <span className="w-[120px] text-sm font-medium text-[#242424]">
              số lượng
            </span>
            <div className="flex items-center justify-start ">
              <button
                onClick={() =>
                  setCartValue(prev => (+prev - 1 < 1 ? 1 : +prev - 1))
                }
                className="flex h-8 w-8 items-center justify-center rounded-l-md border border-neutral-300 bg-transparent outline-none"
              >
                <LuMinus />
              </button>
              <Input
                className="h-[32px] w-[50px] rounded-none border border-x-0 border-neutral-300 bg-white text-center text-base"
                type="number"
                value={cartValue}
                onChange={handleInputQuantity}
              />
              <button
                onClick={() => setCartValue(prev => ++prev + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-r-md border border-neutral-300 bg-transparent outline-none"
              >
                <LuPlus />
              </button>
            </div>
          </div>
        ) : (
          <Skeleton className="mb-12 h-[40px] w-[200px]" />
        )}

        <div className="mt-8 flex min-w-0 flex-wrap gap-4">
          {product ? (
            <>
              <Button
                onClick={onCartClick}
                className="w-full py-4  text-base capitalize md:w-[230px]"
                size="lg"
                variant="outline"
              >
                <LuShoppingBag size={18} className="mr-2" />
                thêm vào giỏ
              </Button>

              <Button
                onClick={onBuyClick}
                className="w-full py-4   text-base capitalize md:w-[150px]"
                variant="secondary"
                size="lg"
              >
                mua ngay
              </Button>
            </>
          ) : (
            <>
              <Skeleton className="h-[50px] w-[200px]" />
              <Skeleton className="h-[50px] w-[200px]" />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
