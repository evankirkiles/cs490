import type {
  R2Object,
  R2HTTPMetadata,
} from "@cloudflare/workers-types/experimental";

/**
 * Chunks an array into smaller arrays of a specified size.
 * @param arr The array of items to chunk
 * @param size The size of each chunk
 * @returns
 */
export const chunkArray = <T>(arr: T[], size: number): T[][] =>
  arr.length > size
    ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)]
    : [arr];

/**
 * Returns a key from a request that can be used to store the response in the R2
 * cache.
 *
 * @param request The request to get the key from
 * @returns
 */
export function _getKey(request?: URL | RequestInfo | undefined) {
  if (request instanceof Request) request = new URL(request.url);
  if (request instanceof URL) return request.pathname;
  return request;
}

/* ------------------------------- Serializers ------------------------------ */

/**
 * Serializes HTTP metadata into a format that can be stored in the R2 store.
 * CloudFlare treats specific HTTP metadata slightly differently from other
 * object attributes, so we need to serialize them separately.
 *
 * @param headers The HTTP headers to serialize
 * @returns
 */
export function serializeHTTPMetadata(headers: Headers): R2HTTPMetadata {
  const expires = headers.get("expires");
  return {
    cacheControl: headers.get("cache-control") || undefined,
    cacheExpiry: expires ? new Date(expires) : undefined,
    contentType: headers.get("content-type") || undefined,
    contentDisposition: headers.get("content-disposition") || undefined,
    contentEncoding: headers.get("content-encoding") || undefined,
    contentLanguage: headers.get("content-language") || undefined,
  };
}

/**
 * Deserialize HTTP metadata from CloudFlare R2 into a format that can be used
 * for HTTP headers.
 *
 * @param headers The HTTP headers from R2 to de-serialize
 * @returns
 */
export function parseHTTPMetadata(headers?: R2HTTPMetadata): Headers {
  const result = new Headers();
  if (!headers) return result;
  if (headers.cacheControl) result.set("Cache-Control", headers.cacheControl);
  if (headers.cacheExpiry)
    result.set("Expires", headers.cacheExpiry.toUTCString());
  if (headers.contentType) result.set("Content-Type", headers.contentType);
  if (headers.contentDisposition)
    result.set("Content-Disposition", headers.contentDisposition);
  if (headers.contentEncoding)
    result.set("Content-Encoding", headers.contentEncoding);
  if (headers.contentLanguage)
    result.set("Content-Language", headers.contentLanguage);
  return result;
}
