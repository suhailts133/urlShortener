import mongoose, { Schema } from "mongoose";
import type { IUrl } from "../interface/url/url.interface";

const urlSchema = new Schema<IUrl>(
  {
    shortUrl: { type: String, required: true },
    originalUrl: { type: String, required: true },
    shortId: { type: String, required: true },
  },
  { timestamps: true }
);

urlSchema.index({ originalUrl: 1 }, { unique: true });
urlSchema.index({ shortId: 1 }, { unique: true });

export const UrlModel = mongoose.model("Url", urlSchema);
