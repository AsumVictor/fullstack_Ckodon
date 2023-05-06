import useAuth from "./useAuth"
import { useGetStudentQuery } from "../apiSlice/studentsApiSlice"
const useStudent = () => {
   const student = useAuth()
   return useGetStudentQuery(student.id)
}
export default useStudent