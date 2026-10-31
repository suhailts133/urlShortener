export const INFRA_MESSAGES = {
  EMAIL_MESSAGES: {
    FAILED: "Failed to send verification email. Please try again later.",
    VERIFY_FAILED: "Failed to verify delivery of the email.",
    NOT_AVAILABLE: "Email service is currently unavailable.",
  },
  MIDDLEWARES: {
    SOMETHING_WENT_WRONG: "Something went wrong on our end.",
    ZOD_VALIDATION_FAILEED: "Validation Failed.",
  },
} as const;
