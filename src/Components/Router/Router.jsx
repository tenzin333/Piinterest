import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useSearch } from "../../Context/SearchContext";

const Home = lazy(() => import("../MainComponent"));
const Login = lazy(() => import("../Login"));
const Nav = lazy(() => import("../NavComponent"));
const Create = lazy(() => import("../CreatePage"));
const Error = lazy(() => import("../ErrorComponent"));
const Profile = lazy(() => import("../ProfileComponent"));
const Search = lazy(() => import("../SearchComponent"));

const Router = () => {
  const { user,profile,handleLogout} = useAuth();
  const { searchedData, isSearching, hasNoResults, publicImages, isFetchingPublic } = useSearch();

  return (
    <>
      {user && <Suspense fallback={<div></div>}><Nav profile={profile} user={user} handleLogout={handleLogout}/></Suspense>}
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Suspense fallback={<div>Loading...</div>}><Login /></Suspense>}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/home" /> : <Suspense fallback={<div>Loading...</div>}><Login /></Suspense>}
        />
        <Route
          path="/search"
          element={
            user ? (
              <Suspense fallback={<div>Loading...</div>}>
                <Search searchedData={searchedData} isSearching={isSearching} hasNoResults={hasNoResults} />
              </Suspense>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/home"
          element={
            user ? (
              <Suspense fallback={<div>Loading...</div>}>
                <Home searchedData={searchedData} isSearching={isSearching} hasNoResults={hasNoResults} publicImages={publicImages} isFetchingPublic={isFetchingPublic} />
              </Suspense>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/create"
          element={user ? <Suspense fallback={<div>Loading...</div>}><Create /></Suspense> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={user ? <Suspense fallback={<div>Loading...</div>}><Profile /></Suspense> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Suspense fallback={<div>Loading...</div>}><Error /></Suspense>} />
      </Routes>
    </>
  );
};

export default Router;
