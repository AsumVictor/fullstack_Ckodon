import useAuth from "./useAuth"
import { useGetAdminQuery } from "../apiSlice/adminSlice"
const useStudent = () => {
   const mentor = useAuth()
   return useGetAdminQuery(mentor.id)
}
export default useStudent