import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Receber o token
  const authToken = request.headers.authorization;

  // validar se o token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    // Validar se o token é valido
    const { sub } = verify(
      token,
      "726f6515dcba8b51da2d873c77a6c819"
    ) as IPayload;

    //Recuperar informações do usuario
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
