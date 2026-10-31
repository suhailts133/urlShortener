import type { IUrlRepo } from "../interface/url/url-repo.interface";
import type { IUrl } from "../interface/url/url.interface";
import { UrlModel } from "../models/url.model";
import { BaseRepository } from "./base.repo";

export class UrlRepo extends BaseRepository<IUrl> implements IUrlRepo {
  constructor() {
    super(UrlModel);
  }

  async findByurl(url: string): Promise<IUrl | null> {
    return await this.findOne({ originalUrl:url });
  }
}
