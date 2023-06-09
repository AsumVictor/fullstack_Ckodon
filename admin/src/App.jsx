import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
//PAGES PUBLIC
import Login from "./features/shared/login/login";

//OTHER INDICATOR PAGES
import UnderConstruction from "./components/indications/underConstruction";
import PersistLogin from "./features/auth/persistLogin";
import ErrorPage from "./components/indications/ErrorPage";
//PAges FOR ADMIN
import SharedLayout from "./features/admin/layouts/shareLayout";
import Dashboard from "./features/admin/dashboard/dashboard";
import AllStudent from "./features/admin/currentStudents/undergraduate/allStudent";
import StudentDetails from "./features/admin/currentStudents/undergraduate/studentDetails";
import AllApplicants from "./features/admin/applicants/undergraduate/allApplicants";
import ApplicantDetails from "./features/admin/applicants/undergraduate/applicantsDetails";
import UndergraduateReviews from "./features/admin/reviews/undergraduates/reviews";
import UndergraduateReviewDetails from "./features/admin/reviews/undergraduates/reviewDetails";
import StudentDocDetails_ug from "./features/admin/currentStudents/undergraduate/studentDocDetails";
import RequireAuth from "./features/auth/requireAuth";


//UNdergradute Students
import UndergraduteStudentDetailLayout from "./features/admin/layouts/undergraduteStudentDetailLayout";
import SatPage from "./features/admin/currentStudents/undergraduate/satPage";
import StudentDoc from "./features/admin/currentStudents/undergraduate/studentDoc";

import PostFile from "./features/admin/files/PostFile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<ErrorPage/>} />

      {/* -------------------ROUTES ADMIN---------------------- */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route element={<SharedLayout />}>
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="undergraduate-students">
              <Route index element={<AllStudent />} />

              <Route path=":id" element={<UndergraduteStudentDetailLayout />}>
              <Route index element={<StudentDetails />} />
              <Route path='sat' element={<SatPage />} />
              <Route path='reviews' element={<StudentDoc />} />
              </Route>

              <Route path=":id/reviews/:id" element={<UndergraduateReviewDetails />} />
            </Route>

            {/* Layouts */}
            <Route path="graduate-students">
              <Route index element={<UnderConstruction />}></Route>

              <Route path=":id" element={<UnderConstruction />} />

              <Route path=":id/:id" element={<h1>Document</h1>} />
            </Route>

            <Route path="reviews-undergraduates">
              <Route index element={<UndergraduateReviews />} />
              <Route path=":id" element={<UndergraduateReviewDetails />} />
            </Route>
            <Route path="reviews-gradutes" element={<UnderConstruction />} />

            {/* All applicants in Ckodon */}

            <Route path="undergraduate-applicants">
              <Route index element={<AllApplicants />} />
              <Route path=":id" element={<ApplicantDetails />} />
            </Route>

            <Route
              path="applicants-graduates"
              element={<UnderConstruction />}
            />
            
            <Route path="files" element={<PostFile />} />

            <Route path="sat-students" element={<UnderConstruction />} />
            <Route path="broadcast" element={<UnderConstruction />} />
            <Route path="chat" element={<UnderConstruction />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
