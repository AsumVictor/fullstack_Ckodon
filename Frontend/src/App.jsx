import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//PAGES PUBLIC
import Login from "./features/shared/login/login";
import Apply from "./features/shared/apply/apply";
import AfterAplly from "./features/shared/apply/afterAplly";

//OTHER INDICATOR PAGES
import UnderConstruction from "./components/indications/underConstruction";

//PAges FOR ADMIN
import SharedLayout from "./features/admin/layouts/shareLayout";
import {
  RedirectToAdminDash,
  RedirectToAdminStudents,
} from "./features/shared/redirects";
import AllStudent from "./features/admin/currentStudents/undergraduate/allStudent";
import StudentDetails from "./features/admin/currentStudents/undergraduate/studentDetails";
import AllApplicants from "./features/admin/applicants/undergraduate/allApplicants";
import ApplicantDetails from "./features/admin/applicants/undergraduate/applicantsDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/apply/:id" element={<AfterAplly />} />


        {/* -------------------ROUTES ADMIN---------------------- */}
        <Route path="admin" element={<SharedLayout />}>
          <Route index element={<UnderConstruction />} />

          <Route path="undergraduate-students">
            <Route index element={<AllStudent />}></Route>

            <Route path=":id" element={<StudentDetails />} />

            <Route path=":id/:id" element={<h1>Document</h1>} />
          </Route>

          {/* Layouts */}
          <Route path="graduate-students">
            <Route index element={<UnderConstruction />}></Route>

            <Route path=":id" element={<UnderConstruction />} />

            <Route path=":id/:id" element={<h1>Document</h1>} />
          </Route>

          <Route
            path="reviews/undergraduates"
            element={<UnderConstruction />}
          />
          <Route path="reviews/gradutes" element={<UnderConstruction />} />

          {/* All applicants in Ckodon */}

          <Route path="undergraduate-applicants">
            <Route index element={<AllApplicants />} />
            <Route path=":id" element={<ApplicantDetails />} />
          </Route>

          <Route path="applicants/graduates" element={<UnderConstruction />} />
          <Route path="sat-students" element={<UnderConstruction />} />
          <Route path="broadcast" element={<UnderConstruction />} />
          <Route path="chat" element={<UnderConstruction />} />
        </Route>

        {/* -------------------ALL REDIRECTS---------------------- */}
        <Route path="admin" element={<RedirectToAdminDash />} />
        <Route path="students" element={<RedirectToAdminStudents />} />
        <Route path="reviews" element={<RedirectToAdminStudents />} />
        <Route path="applicants" element={<RedirectToAdminStudents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
