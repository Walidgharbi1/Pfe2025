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
import MesCandidatures from "../pages/candidat/MesCandidatures";
import Agenda from "../pages/admin/Agenda";
import CandidatAgenda from "../pages/candidat/CandidatAgenda";
import ActualitesVisualization from "../pages/Actualites";
import ChefRDashboard from "../pages/chef_Recrutement/ChefRDashboard";
import ChefRListaCandidat from "../pages/chef_Recrutement/ChefRListeCandidats";
import ChefROffreList from "../pages/chef_Recrutement/ChefROffreList";
import ChefROffreManagement from "../pages/chef_Recrutement/ChefROffreManagement";
import ChefRTestManagement from "../pages/chef_Recrutement/ChefRTestManagement";
import ChefRAgenda from "../pages/chef_Recrutement/Agenda";
import ChefRListCandidatures from "../pages/chef_Recrutement/ChefRCandidaturesCandidat";
function AppRouter() {
  return (
    <>
      <ToastContainer />
      <BarreNavigation />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/actualites" element={<ActualitesVisualization />} />
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
        <Route
          path="/agenda"
          element={
            <RouteProtegee roleAttendu="admin">
              <Agenda />
            </RouteProtegee>
          }
        />
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
        />
        <Route
          path="/candidat_agenda"
          element={
            <RouteProtegee roleAttendu="candidat">
              <CandidatAgenda />
            </RouteProtegee>
          }
        />

        <Route
          path="/mes_candidatures"
          element={
            <RouteProtegee roleAttendu="candidat">
              {/*  <CandiaatLayout>  <MesCandidatures /> </CandidaturesLayout> */}
              <MesCandidatures />
            </RouteProtegee>
          }
        ></Route>
        {/* Sous-routes pour CandidatDashboard */}
        <Route
          path="profil"
          element={
            <RouteProtegee roleAttendu="candidat">
              <ProfilCandiat />
            </RouteProtegee>
          }
        />
        <Route path="statistiques" element={<StatistiquesCandidat />} />
        {/* Modifier Profil du Candidat */}
        <Route
          path="/modifierProfil"
          element={
            <RouteProtegee roleAttendu="candidat">
              <ModifierProfil />
            </RouteProtegee>
          }
        />

        <Route
          path="/chefr_dashboard"
          element={
            <RouteProtegee roleAttendu={"chefR"}>
              <ChefRDashboard />
            </RouteProtegee>
          }
        />

        <Route
          path="/chefRListCandidat"
          element={
            <RouteProtegee roleAttendu={"chefR"}>
              <ChefRListaCandidat />
            </RouteProtegee>
          }
        />

        <Route
          path="/chefROffreList"
          element={
            <RouteProtegee roleAttendu={"chefR"}>
              <ChefROffreList />
            </RouteProtegee>
          }
        />

        <Route
          path="/chefROffreManagement"
          element={
            <RouteProtegee roleAttendu={"chefR"}>
              <ChefROffreManagement />
            </RouteProtegee>
          }
        />

        <Route
          path="/chefRTestManagement"
          element={
            <RouteProtegee roleAttendu={"chefR"}>
              <ChefRTestManagement />
            </RouteProtegee>
          }
        />

        <Route
          path="/chefRAgenda"
          element={
            <RouteProtegee roleAttendu={"chefR"}>
              <ChefRAgenda />
            </RouteProtegee>
          }
        />

        <Route
          path="/chefRlisteCandidatures"
          element={
            <RouteProtegee roleAttendu={"chefR"}>
              <ChefRListCandidatures />
            </RouteProtegee>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default AppRouter;
