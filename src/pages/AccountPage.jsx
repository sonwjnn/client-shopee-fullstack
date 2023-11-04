import { FaRegUser, FaUserCircle } from 'react-icons/fa'
import { SiReacthookform } from 'react-icons/si'
import { BsBell } from 'react-icons/bs'
import { AiOutlineTags, AiTwotoneShop } from 'react-icons/ai'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import PasswordUpdate from '@/components/PasswordUpdate'
import FavoriteList from '@/components/FavoriteList'
import TextAvatar from '@/components/TextAvatar'
import ProfileUpdate from '@/components/ProfileUpdate'
import PurchaseList from '@/components/PurchaseList'
import ShowUserShop from '@/components/ShowUserShop'

const AccountPage = () => {
  const { user } = useSelector(state => state.user)
  const [activeAccount, setActiveAccount] = useState(null)
  const { accountType, authCate } = useParams()
  const location = useLocation()
  const [onChange, setOnChange] = useState(false)

  const actionsAccount = [
    ['profile', 'hồ sơ'],
    ['password', 'đổi mật khẩu']
  ]

  const [onRequest, setOnRequest] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-white md:bg-bg_page px-0 xl:px-[136px] py-0 sm:py-[56px]   min-h-[80vh]">
      <div className=" h-full rounded-md max-w-[1220px] ">
        <div className="flex min-h-[66vh]">
          <div
            className={`bg-white md:bg-bg_page ${
              accountType || authCate ? 'hidden' : ''
            } md:block md:w-[250px] w-full   md:p-4`}
          >
            <div className="flex flex-col md:gap-6 mt-10  md:px-0 md:mt-0">
              <div className="flex gap-2 p-4">
                <div className="min-w-[50px] min-h-[50px] ">
                  <TextAvatar text={user.name} />
                </div>
                <div className="text-[26px] md:text-[20px] lg:text-base text-gray-600 font-semibold line-clamp-2">
                  {user.name}
                </div>
              </div>

              <div className="flex  gap-3 items-center  account-item ">
                <FaRegUser className="self-start text-[30px] md:text-[22px] mt-8 md:mt-0 text-blue-600" />
                <div className="flex flex-col capitalize gap-3 w-full">
                  <span className="text-base pt-0">
                    <Link to={'/user/account/profile'}>tài khoản của tôi</Link>
                  </span>
                  <div className="gap-2 flex flex-col ">
                    {actionsAccount.map((action, index) => (
                      <Link
                        key={index}
                        to={`/user/account/${action[0]}`}
                        className={`action-account ${
                          activeAccount === index ? 'active' : ''
                        } capitalize text-gray-600  text-left p-1 md:p-0 text-[20px] md:text-sm ml-1`}
                        onClick={() => setActiveAccount(index)}
                      >
                        {action[1]}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <button className="flex gap-3 items-center account-item">
                <SiReacthookform className="text-[30px] md:text-[22px] text-orange-700" />
                <span className="text-base text-left capitalize w-full">
                  <Link to={'/user/purchase'}>đơn mua</Link>
                </span>
              </button>

              <button className="flex gap-3 items-center account-item">
                <BsBell className="text-[30px] md:text-[22px] text-yellow-500" />
                <span className="text-base text-left capitalize w-full">
                  thông báo
                </span>
              </button>

              <button className="flex gap-3 items-center account-item">
                <AiOutlineTags className="text-[32px] md:text-[20px] text-purple-500" />
                <span className="text-base text-left capitalize w-full">
                  kho vouncher
                </span>
              </button>

              <button className="flex gap-3 items-center account-item">
                <MdOutlineFavoriteBorder className="text-[30px] md:text-[20px] text-red-500" />
                <span className="text-base text-left capitalize w-full">
                  <Link to={'/user/favorite'}>yêu thích</Link>
                </span>
              </button>

              <button className="flex gap-3 items-center account-item">
                <AiTwotoneShop className="text-[30px] md:text-[20px] text-purple-500" />
                <span className="text-base text-left capitalize w-full">
                  <Link to={'/user/shop'}>Shop</Link>
                </span>
              </button>
            </div>
          </div>
          <div
            className={`bg-white  w-full rounded-md p-4 ${
              accountType || authCate ? 'block' : 'hidden'
            } md:block`}
          >
            <div className="text-[24px] py-4 text-gray-600 px-8 capitalize border-b-gray-200 border-b">
              {accountType === 'password'
                ? 'đổi mật khẩu'
                : accountType === 'profile'
                ? 'hồ sơ'
                : location.pathname === '/user/purchase'
                ? 'đơn hàng'
                : location.pathname === '/user/favorite'
                ? 'yêu thích'
                : location.pathname === '/user/shop'
                ? 'shop'
                : ''}
            </div>
            {accountType === 'profile' && <ProfileUpdate />}
            {accountType === 'password' && <PasswordUpdate />}
            {authCate === 'purchase' && <PurchaseList />}
            {authCate === 'favorite' && <FavoriteList />}
            {authCate === 'shop' && <ShowUserShop />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage
