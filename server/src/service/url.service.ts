import { env } from "../config/env.config";
import type { IApiResponse } from "../interface/common/api.response.interface";
import type { IUrlRepo } from "../interface/url/url-repo.interface";
import type { IUrlService } from "../interface/url/url-service.interface";
import { nanoid } from "nanoid";
import { URL_MESSAGES } from "../shared/messages/urlMessages";
import { RESPONSE_CODE } from "../shared/constants/statusCode";
import { AppError } from "../shared/errors/appError";
export class UrlService implements IUrlService {
  constructor(private _urlRepo: IUrlRepo) {}

  async generateUrl(ogUrl: string): Promise<IApiResponse<string>> {
    const url = await this._urlRepo.findByurl(ogUrl);
    if (!url) {
      const shortId = nanoid(8);
      const shortUrl = `${env.BASE}/${shortId}`;
      const newShortUrl = await this._urlRepo.create({
        shortId,
        originalUrl: ogUrl,
        shortUrl,
      });
      return { message: URL_MESSAGES.URL.CREATED, statuscode: RESPONSE_CODE.CREATED, data: newShortUrl.shortUrl };
    }
    return { message: URL_MESSAGES.URL.ALREADY_EXISTS, data: url.shortUrl };
  }
  
  async redirectUrl(shortId: string): Promise<string> {
    const shortUrl = await this._urlRepo.findOne({ shortId });
    if (!shortUrl) {
      throw new AppError(URL_MESSAGES.URL.NOT_FOUND, RESPONSE_CODE.NOT_FOUND);
    }
    return shortUrl.originalUrl;
  }
}
