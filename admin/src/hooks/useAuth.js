 

import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)

    if (token) {
        const decoded = jwtDecode(token)
        const admin = {...decoded.UserInfo._doc}
        return { ...admin}
    }

    return {roles: '', }
}
export default useAuth