import { AuthController } from "../controller/auth.controller";
import { UrlController } from "../controller/url.controller";
import { authService, urlService } from "./service";

export const authController = new AuthController(authService);
export const urlController = new UrlController(urlService)