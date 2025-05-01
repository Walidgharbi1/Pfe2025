import { Routes, Route } from "react-router-dom";
import Accueil from "../pages/Accueil";
import Connexion from "../pages/Connexion";
import Inscription from "../pages/Inscription";
import BarreNavigation from "../composants/BarreNavigation";
import Footer from "../composants/Footer";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ListeCandidats from "../pages/admin/ListeCandidats";
import ListeChefs from "../pages/admin/ListChefs";
import OffreManagement from "../pages/admin/OffreManagement";
import TestManagement from "../pages/admin/TestManagement";
import ActualiteManagement from "../pages/admin/ActualiteManagement";
import OffreList from "../pages/admin/OffreList";
import CandidatDashboard from "../pages/CandidatDashboard";
import ProfilCandiat from "../pages/ProfilCandidat";
import StatistiquesCandidat from "../pages/StatistiquesCandidat";
import ModifierProfil from "../pages/ModifierProfil";
import RouteProtegee from "./RouteProtegee";
import { ToastContainer } from "react-toastify";
import ListCandidatures from "../pages/admin/CandidaturesCandidat";
function AppRouter() {
  return (
    <>
      <ToastContainer />
      <BarreNavigation />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        {/* 🔐 ADMIN uniquement */}
        <Route
          path="/AdminDashboard"
          element={
            <RouteProtegee roleAttendu="admin">
              <AdminDashboard />
            </RouteProtegee>
          }
        />
        <Route
          path="/ListeCandidats"
          element={
            <RouteProtegee roleAttendu="admin">
              <ListeCandidats />
            </RouteProtegee>
          }
        />
        <Route
          path="/ListCandidatures"
          element={
            <RouteProtegee roleAttendu="admin">
              <ListCandidatures />
            </RouteProtegee>
          }
        />
        ListCandidatures
        <Route
          path="/ListeChefs"
          element={
            <RouteProtegee roleAttendu="admin">
              <ListeChefs />
            </RouteProtegee>
          }
        />
        {/* 🔐 ADMIN uniquement : Gestion des offres */}
        <Route
          path="/gestionOffres"
          element={
            <RouteProtegee roleAttendu="admin">
              <OffreManagement />
            </RouteProtegee>
          }
        />
        <Route
          path="/gestionTest"
          element={
            <RouteProtegee roleAttendu="admin">
              <TestManagement />
            </RouteProtegee>
          }
        />
        <Route
          path="/gestionActualites"
          element={
            <RouteProtegee roleAttendu="admin">
              <ActualiteManagement />
            </RouteProtegee>
          }
        />
        <Route path="/offres" element={<OffreList />} />
        <Route
          path="/CandidatDashboard"
          element={
            <RouteProtegee roleAttendu="candidat">
              <CandidatDashboard />
            </RouteProtegee>
          }
        >
          {/* Sous-routes pour CandidatDashboard */}
          <Route path="profil" element={<ProfilCandiat />} />

          <Route path="statistiques" element={<StatistiquesCandidat />} />
        </Route>
        {/* Modifier Profil du Candidat */}
        <Route
          path="/modifierProfil"
          element={
            <RouteProtegee roleAttendu="candidat">
              <ModifierProfil />
            </RouteProtegee>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default AppRouter;
