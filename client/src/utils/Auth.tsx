import React ,{useEffect,useContext} from 'react'
import { checkToken } from '../api'
import { ContextProvider } from '../context'

const Auth = ({children}:{children:JSX.Element}) => {
    const {setAuth,setUser,setLoading} = useContext(ContextProvider)
    useEffect(() => {
        const token = localStorage.getItem('token')
        console.log(token);
        
        const check=async ()=>{
            setLoading(true)
            const data=await checkToken(token as string)
            setLoading(false)
            console.log(data);
            if(data?.data.success){
                setUser(data.data.data.user)
                setAuth(true)
            }
        }
        if(token){
            check()
        }
    }, [])
    
  return children
}

export default Auth