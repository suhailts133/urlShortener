export const URL_MESSAGES = {
  URL: {
    CREATED: "Short URL generated successfully.",
    CREATION_FAILED: "Failed to generate short URL. Please try again later.",
    REDIRECT_SUCCESS: "Redirecting to the original URL.",
    NOT_FOUND: "Short URL not found.",
    INVALID_URL: "Please provide a valid URL.",
    URL_REQUIRED: "URL is required.",
    FETCH_SUCCESS: "URL details fetched successfully.",
    DELETION_SUCCESS: "Short URL deleted successfully.",
    DELETION_FAILED: "Failed to delete short URL. Please try again later.",
    EXPIRED: "This short URL has expired.",
    ALREADY_EXISTS: "A short URL already exists for this URL.",

    SHORT_ID_REQUIRED: "Short URL ID is required.",
    ORIGINAL_URL_NOT_FOUND: "Original URL not found for the provided short ID.",
    ORIGINAL_URL_FETCHED: "Original URL retrieved successfully.",
  },
} as const;