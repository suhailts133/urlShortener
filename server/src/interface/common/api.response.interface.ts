export interface IApiResponse<T = null> {
  success?: boolean;
  message: string;
  data?: T;
  statuscode?: number;
}



export interface AuthResponseDTO {
  jwtToken: string;
  refreshToken: string;
  user: UserRepsonseDTO;
}

export interface UserRepsonseDTO {
  id: string;
  email: string;
  name: string;
}

export interface RefreshTokenDTO {
  newAccessToken: string;
}

