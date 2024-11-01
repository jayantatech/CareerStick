export interface XssOptions {
  whiteList?: { [key: string]: string[] };
  stripIgnoreTag?: boolean;
  stripIgnoreTagBody?: string[];
}

export interface SanitizedRequest {
  body: any;
  query: any;
  params: any;
}

import xss from "xss";
import { Request, Response, NextFunction } from "express";

class XssProtection {
  private static cleanValue(value: any): any {
    if (typeof value !== "object") {
      return typeof value === "string" ? xss(value) : value;
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.cleanValue(item));
    }

    const cleaned: { [key: string]: any } = {};
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        cleaned[key] = this.cleanValue(value[key]);
      }
    }
    return cleaned;
  }

  public static middleware(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    try {
      if (req.body) {
        req.body = this.cleanValue(req.body);
      }
      if (req.query) {
        req.query = this.cleanValue(req.query);
      }
      if (req.params) {
        req.params = this.cleanValue(req.params);
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  public static customClean(content: string, options?: XssOptions): string {
    return xss(content, options);
  }
}

export default XssProtection;
