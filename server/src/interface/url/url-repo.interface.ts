import type { IBaseRepository } from "../common/base.repo.interface";
import type { IUrl } from "./url.interface";

export interface IUrlRepo extends IBaseRepository<IUrl> {
  findByurl(url: string): Promise<IUrl | null>;
}
