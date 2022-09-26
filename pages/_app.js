import { auth, db, updateUser } from '../firebase'
import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import Login from './login'
import Loading from '../components/Loading'
import { useEffect } from 'react'
// import firebase from 'firebase'

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if(user){
      updateUser(user.uid, user).catch((res)=>console.log(res))
    }
  }, [user])

  if(loading) return <Loading />
  if(!user) return <Login />
  return <Component {...pageProps} />
}

export default MyApp
