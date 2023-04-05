import React from "react";
import "./style.css";
import { useSelector } from "react-redux";
import { selectUserById } from "../../../../apiSlice/usersApiSlice";
import { Link } from "react-router-dom";

const User = ({ userId, index }) => {
  const user = useSelector((state) => selectUserById(state, userId));

  if (user) {
    const userTrContent =
      user.role === "undergraduate" ? (
        <tr className="bg-white cursor-pointer border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="px-6 py-4 tabel-hide">{index}</td>
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {`${user.firstName} ${user.lastName}`}
          </th>
          <td className="px-6 py-4 tabel-hide">{user.school}</td>
          <td className="px-6 py-4 tabel-hide">2 mar 2023, 14:30pm</td>
          <td className="px-6 py-4 text-right">
            <Link
              to={`${userId}`}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Open Files
            </Link>
          </td>
        </tr>
      ) : null;

    return userTrContent;
  }
};
export default User;
