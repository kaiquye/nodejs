import { Router } from "express";
import UniversityRoutes from "./university.routes";

const AppRoutes = Router();
const baseUrl = (url) => {
  return "/server" + url;
};

AppRoutes.use(baseUrl("/v1"), UniversityRoutes);

export default AppRoutes;
