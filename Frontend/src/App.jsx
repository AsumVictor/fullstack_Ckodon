import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Routes,
} from "react-router-dom";
//PAGES PUBLIC
import Login from "./features/shared/login/login";
import Apply from "./features/shared/apply/apply";
import AfterAplly from "./features/shared/apply/afterAplly";

//OTHER INDICATOR PAGES
import UnderConstruction from "./components/indications/underConstruction";

//PAges FOR ADMIN
import SharedLayout from "./features/admin/layouts/shareLayout";
import AllStudent from "./features/admin/currentStudents/undergraduate/allStudent";
import StudentDetails, {ReviewFromUserLoader} from "./features/admin/currentStudents/undergraduate/studentDetails";
import AllApplicants from "./features/admin/applicants/undergraduate/allApplicants";
import ApplicantDetails from "./features/admin/applicants/undergraduate/applicantsDetails";
import UndergraduateReviews from "./features/admin/reviews/undergraduates/reviews";
import UndergraduateReviewDetails, {
  SpecficReviewLoader,
} from "./features/admin/reviews/undergraduates/reviewDetails";
import StudentDocDetails_ug  from "./features/admin/currentStudents/undergraduate/studentDocDetails";

//Pages for studentsudent
import Student_SharedLayout from "./features/undergrad_students/layout/student_layout";

//Router Elements
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/apply" element={<Apply />} />
      <Route path="/apply/:id" element={<AfterAplly />} />

      {/* -------------------ROUTES ADMIN---------------------- */}
      <Route path="admin" element={<SharedLayout />}>
        <Route index element={<UnderConstruction />} />

        <Route path="undergraduate-students">
          <Route index element={<AllStudent />}></Route>

          <Route path=":id" element={<StudentDetails />} loader={ReviewFromUserLoader}/>

          <Route path=":id/:id" element={<StudentDocDetails_ug/>} loader={SpecficReviewLoader} />
        </Route>

        {/* Layouts */}
        <Route path="graduate-students">
          <Route index element={<UnderConstruction />}></Route>

          <Route path=":id" element={<UnderConstruction />} />

          <Route path=":id/:id" element={<h1>Document</h1>} />
        </Route>

        <Route path="reviews-undergraduates">
          <Route index element={<UndergraduateReviews />} />
          <Route
            path=":id"
            element={<UndergraduateReviewDetails />}
            loader={SpecficReviewLoader}
          />
        </Route>
        <Route path="reviews-gradutes" element={<UnderConstruction />} />

        {/* All applicants in Ckodon */}

        <Route path="undergraduate-applicants">
          <Route index element={<AllApplicants />} />
          <Route path=":id" element={<ApplicantDetails />} />
        </Route>

        <Route path="applicants-graduates" element={<UnderConstruction />} />
        <Route path="sat-students" element={<UnderConstruction />} />
        <Route path="broadcast" element={<UnderConstruction />} />
        <Route path="chat" element={<UnderConstruction />} />
      </Route>

      {/* ROUTES FOR UNDERGRAD STUDENTS */}
      <Route path="undergrad" element={<Student_SharedLayout />}></Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
