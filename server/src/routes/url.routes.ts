import { Router } from "express";
import { urlController } from "../containers/controller";

import { zodValidate } from "../middlewares/zodValidation";

import { urlSchema } from "../dtos/url/create-url.dto";
import authenticate from "../middlewares/authenticate";

const router = Router();

router.post("/", authenticate, zodValidate(urlSchema), urlController.generateUrl);

export const urlroutes = router;
