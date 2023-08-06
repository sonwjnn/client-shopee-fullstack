import { Outlet } from 'react-router-dom'
import GlobalLoading from '../common/GlobalLoading.jsx'
import Footer from '../common/Footer.jsx'
import Appbar from '../common/AppBar.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import userApi from '../../apis/modules/user.api.js'
import cartApi from '../../apis/modules/cart.api'
import {
  setListCarts,
  setListFavorites,
  setUser
} from '../../redux/features/userSlice.js'
import NavigateMobile from '../common/NavigateMobile.jsx'
import favoriteApi from '../../apis/modules/favorite.api.js'

// Layout use for all pages
const MainLayout = () => {
  const { authModalOpen } = useSelector(state => state.authModal)

  const dispatch = useDispatch()

  const { user, listFavorites } = useSelector(state => state.user)

  //get user from redux store with JWT
  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo()
      if (response) {
        dispatch(setUser(response))
      } else dispatch(setUser(null))
    }
    authUser()
  }, [dispatch])

  useEffect(() => {
    const cartsOfUser = async () => {
      const { response, err } = await cartApi.getList()
      if (response) dispatch(setListCarts(response))
    }
    cartsOfUser()
    if (!user) {
      dispatch(setListCarts([]))
    }
  }, [user, dispatch])

  useEffect(() => {
    const favoritesOfUser = async () => {
      const { response, err } = await favoriteApi.getList()
      if (response) dispatch(setListFavorites(response))
    }
    favoritesOfUser()
    if (!user) {
      dispatch(setListFavorites([]))
    }
  }, [user, dispatch])

  return (
    <>
      {/* global loading*/}
      <GlobalLoading />
      {/* global loading*/}

      {/* login loading*/}
      {/* <AuthModal /> */}
      {/* login loading*/}

      <div className="flex flex-col  font-roboto ">
        {/* header */}
        <Appbar />
        {/* header */}

        {/* main */}
        <main className="flex-grow">
          <Outlet />
        </main>
        {/* main */}
        <div className=" lg:hidden h-[64px] fixed bottom-0 left-0 right-0 z-100">
          <NavigateMobile />
        </div>
      </div>

      {/* footer */}
      <Footer />
      {/* footer */}
    </>
  )
}

export default MainLayout
