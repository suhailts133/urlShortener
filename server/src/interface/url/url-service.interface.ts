import type { IApiResponse } from "../common/api.response.interface";

export interface IUrlService {
  generateUrl(ogUrl: string): Promise<IApiResponse<string>>;
  redirectUrl(urlId: string): Promise<string>;
}
