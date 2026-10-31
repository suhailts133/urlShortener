import type { IUrlService } from "../interface/url/url-service.interface";
import type { Request, Response } from "express";
import { AppError } from "../shared/errors/appError";
import asyncHandler from "express-async-handler";
import type { CreateUrlDto } from "../dtos/url/create-url.dto";
import { RespsonseHelper } from "../shared/common/responseHelper";
import { URL_MESSAGES } from "../shared/messages/urlMessages";
import { RESPONSE_CODE } from "../shared/constants/statusCode";
export class UrlController {
  constructor(private _urlService: IUrlService) {}

  generateUrl = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body as CreateUrlDto;
    const result = await this._urlService.generateUrl(body.url);
    RespsonseHelper.success(res, result);
  });

  redirectUrl = asyncHandler(async (req: Request, res: Response) => {
    const shortId = req.params.shortId as string;
    if (!shortId) throw new AppError(URL_MESSAGES.URL.SHORT_ID_REQUIRED, RESPONSE_CODE.BAD_REQUEST);
    const result = await this._urlService.redirectUrl(shortId);
    res.redirect(result);
  });
}
