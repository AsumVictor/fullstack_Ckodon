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

//OTHER INDICATOR PAGES
import UnderConstruction from "./components/indications/underConstruction";

//Pages for studentsudent
import Student_SharedLayout from "./features/undergrad_students/layout/student_layout";
import HonorLayout from "./features/undergrad_students/layout/honorLayout";
import HonorQuickView from "./features/undergrad_students/honors/quickView";
import CreateHonor from "./features/undergrad_students/honors/createHonor";
import InDetailReview, {
  GetSpecficReviewLoader,
} from "./features/undergrad_students/reviews/inDetailReview";
import Student_reviews, {
  GetReviewFromUserLoader,
} from "./features/undergrad_students/reviews/reviews";
import Dashboard from "./features/undergrad_students/dashboard/Dashboard";
//PROFILE
import ProfileLayout from "./features/undergrad_students/layout/profileLayout";
import EditProfile from "./features/undergrad_students/profile/EditProfile";
import Profile from "./features/undergrad_students/profile/Profile";

//Logins
import PersistLogin from "./features/auth/persistLogin";
import RequireAuth from "./features/auth/requireAuth";

//Router Elements
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/apply" element={<Apply />} />

      {/* ROUTES FOR UNDERGRAD STUDENTS */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<Student_SharedLayout />}>
            <Route index element={<Dashboard />} />

            <Route path="honors" element={<HonorLayout />}>
              <Route index element={<HonorQuickView />} />
              <Route
                path="create"
                element={<CreateHonor />}
              />
            </Route>
            <Route
              path="reviews"
              element={<Student_reviews />}
              loader={GetReviewFromUserLoader}
            />
            <Route
              path="reviews/:id"
              element={<InDetailReview />}
              loader={GetSpecficReviewLoader}
            />

            <Route path="activities" element={<UnderConstruction />} />
            <Route path="essays" element={<UnderConstruction />} />
            <Route path="recommendation" element={<UnderConstruction />} />
            <Route path="financial-aid" element={<UnderConstruction />} />
            <Route path="interview-prep" element={<UnderConstruction />} />
            <Route path="chat" element={<UnderConstruction />} />
          </Route>

          <Route path="profile" element={<ProfileLayout />}>
            <Route index element={<Profile />} />
            <Route path="setting" element={<EditProfile />}></Route>
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
