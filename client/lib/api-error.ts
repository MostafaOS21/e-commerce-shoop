export class ApiError {
  private static _title: string;
  private static _statusCode: number;
  private static _description?: string;

  static generate(
    error: any,
    alt?: string
  ): {
    title: string;
    status: number;
    variant: "destructive";
    description?: string;
  } {
    if (typeof error?.response?.data?.message === "string") {
      this._title = error?.response?.data?.message;
    } else if (Array.isArray(error?.response?.data?.message)) {
      this._title = error?.response?.data?.message[0];
    } else if (error?.response?.data?.message) {
      this._title = error?.response?.data?.message;
    } else if (error?.message) {
      this._title = error?.message;
    } else if (alt) this._title = alt;
    else this._title = "An error occurred";

    this._statusCode = error?.response?.status || 500;

    if (error?.response?.data?.error) {
      this._description = error?.response?.data?.error;
    }

    // if (this._title.toLowerCase().includes("read more at")) {
    //   this._title = this._title.split("Read more at")[0];
    // }
    return {
      title: this._title,
      status: this._statusCode,
      description: this._description,
      variant: "destructive",
    };
  }
}
