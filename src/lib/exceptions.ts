export class ValidationError extends Error {
  constructor(
    message: string = "Some fields are invalid or missing, please check and try again.",
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

export class UnknownError extends Error {
  constructor(message: string = "An unknown error occurred.") {
    super(message);
    this.name = "UnknownError";
  }
}

export class UploadError extends Error {
  constructor(message: string = "Failed to upload company logo.") {
    super(message);
    this.name = "UploadError";
  }
}

export class PostJobError extends Error {
  constructor(message: string = "Failed to post job. Please try again later.") {
    super(message);
    this.name = "PostJobError";
  }
}
