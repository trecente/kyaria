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

export class SignUpError extends Error {
  constructor(message: string = "Failed to sign up. Please try again later.") {
    super(message);
    this.name = "SignUpError";
  }
}

export class EmailAlreadyInUseError extends Error {
  constructor(message: string = "Email already in use.") {
    super(message);
    this.name = "EmailAlreadyInUseError";
  }
}

export class InvalidCredentialsError extends Error {
  constructor(message: string = "Invalid credentials.") {
    super(message);
    this.name = "InvalidCredentialsError";
  }
}

export class SignInError extends Error {
  constructor(message: string = "Failed to sign in. Please try again later.") {
    super(message);
    this.name = "SignInError";
  }
}

export class SignInRequiredError extends Error {
  constructor(
    message: string = "You need to be signed in to perform this action.",
  ) {
    super(message);
    this.name = "SignInRequiredError";
  }
}

export class SignOutError extends Error {
  constructor(message: string = "Failed to sign out. Please try again later.") {
    super(message);
    this.name = "SignOutError";
  }
}
