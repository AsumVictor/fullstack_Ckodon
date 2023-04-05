import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//PAGES PUBLIC
import Login from "./features/public/login/login";
import UnderConstruction from "./components/indications/underConstruction";

//PAges FOR ADMIN
import SharedLayout from "./features/admin/layouts/shareLayout";
import {
  RedirectToAdminDash,
  RedirectToAdminStudents,
} from "./features/public/redirects";
import AllStudent from "./features/admin/currentStudents/undergraduate/allStudent";
import StudentDetails from "./features/admin/currentStudents/undergraduate/studentDetails";
import AllApplicants from "./features/admin/applicants/undergraduate/allApplicants";
import ApplicantDetails from "./features/admin/applicants/undergraduate/applicantsDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />

        {/* -------------------ROUTES ADMIN---------------------- */}
        <Route element={<SharedLayout />}>
          <Route path="admin/dashboard" element={<UnderConstruction />} />
          <Route
            path="admin/students/undergraduates"
            element={<AllStudent />}
          />
          <Route
            path="admin/students/undergraduates/:id"
            element={<StudentDetails />}
          />

          <Route
            path="admin/students/undergraduates/:id/:id"
            element={<h1>Document</h1>}
          />

          {/* Layouts */}
          <Route
            path="admin/students/graduates"
            element={<UnderConstruction />}
          />
          <Route
            path="admin/reviews/undergraduates"
            element={<UnderConstruction />}
          />
          <Route
            path="admin/reviews/gradutes"
            element={<UnderConstruction />}
          />

          {/* All applicants in Ckodon */}

          <Route
            path="admin/applicants/undergraduates"
            element={<AllApplicants />}
          />

          <Route
            path="admin/applicants/undergraduates/:id"
            element={<ApplicantDetails />}
          />

          <Route
            path="admin/applicants/graduates"
            element={<UnderConstruction />}
          />
          <Route path="admin/sat-students" element={<UnderConstruction />} />
          <Route path="admin/broadcast" element={<UnderConstruction />} />
          <Route path="admin/chat" element={<UnderConstruction />} />
        </Route>

        {/* -------------------ALL REDIRECTS---------------------- */}
        <Route path="admin" element={<RedirectToAdminDash />} />
        <Route path="admin/students" element={<RedirectToAdminStudents />} />
        <Route path="admin/reviews" element={<RedirectToAdminStudents />} />
        <Route path="admin/applicants" element={<RedirectToAdminStudents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
