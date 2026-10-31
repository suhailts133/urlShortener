import { RedisRepository } from "../repo/redis.repo";
import { UrlRepo } from "../repo/url.repo";
import { UserRepo } from "../repo/user.repo";

export const redisRepo = new RedisRepository();
export const userRepo = new UserRepo();
export const urlRepo = new UrlRepo()