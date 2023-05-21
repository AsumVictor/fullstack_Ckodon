import useAuth from "./useAuth"
import { useGetAdminQuery } from "../apiSlice/adminSlice"
const useStudent = () => {
   const admin = useAuth()
   return useGetAdminQuery(admin.id)
}
export default useStudent