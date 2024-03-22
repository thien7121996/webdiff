type CookieOptions = {
  expires?: number;
  path?: string;
  domain?: string;
};

export class Cookie {
  static ACCESS_TOKEN = new Cookie('accessToken', {
    expires: 30,
  });

  static REFRESH_TOKEN = new Cookie('refreshToken', {
    expires: 365,
  });

  static RECENTLY_VIEWED_PRODUCTS = new Cookie('recentlyViewedProduct');

  static UUID = new Cookie('uuid');

  private constructor(
    private _name: string,
    private _options: CookieOptions = {}
  ) {}

  get name() {
    return this._name;
  }

  get options() {
    return this._options;
  }
}
