import { AuthService } from "../service/auth.service";
import { UrlService } from "../service/url.service";
import {  redisRepo, urlRepo, userRepo } from "./repo";

export const authService = new AuthService(userRepo, redisRepo);
export const urlService = new UrlService(urlRepo)