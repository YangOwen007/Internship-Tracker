type RateLimitWindow = {
  count: number;
  resetAt: number;
};

type HeaderValue = string | string[] | undefined;

const globalForSecurity = globalThis as unknown as {
  rateLimitStore?: Map<string, RateLimitWindow>;
};

const rateLimitStore =
  globalForSecurity.rateLimitStore ?? new Map<string, RateLimitWindow>();

if (!globalForSecurity.rateLimitStore) {
  globalForSecurity.rateLimitStore = rateLimitStore;
}

function readHeaderValue(
  headersLike: Headers | Record<string, HeaderValue> | null | undefined,
  headerName: string,
) {
  if (!headersLike) {
    return undefined;
  }

  if (headersLike instanceof Headers) {
    return headersLike.get(headerName) ?? undefined;
  }

  const directValue = headersLike[headerName] ?? headersLike[headerName.toLowerCase()];

  return Array.isArray(directValue) ? directValue[0] : directValue;
}

function pruneExpiredRateLimits(now: number) {
  for (const [key, window] of rateLimitStore.entries()) {
    if (window.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}

export function getClientIpFromHeaders(
  headersLike: Headers | Record<string, HeaderValue> | null | undefined,
) {
  const forwardedFor = readHeaderValue(headersLike, "x-forwarded-for");
  const realIp = readHeaderValue(headersLike, "x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return realIp?.trim() || "unknown";
}

export function consumeRateLimit(
  key: string,
  options: {
    limit: number;
    windowMs: number;
  },
) {
  const now = Date.now();
  pruneExpiredRateLimits(now);

  const currentWindow = rateLimitStore.get(key);

  if (!currentWindow || currentWindow.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + options.windowMs,
    });

    return {
      allowed: true,
      retryAfterSeconds: 0,
    };
  }

  if (currentWindow.count >= options.limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((currentWindow.resetAt - now) / 1000),
      ),
    };
  }

  currentWindow.count += 1;
  rateLimitStore.set(key, currentWindow);

  return {
    allowed: true,
    retryAfterSeconds: 0,
  };
}

export function sanitizeCallbackPath(value: string | null | undefined) {
  const trimmedValue = value?.trim();

  // Only allow same-site relative paths so login cannot be abused as an
  // open redirect to an attacker-controlled domain.
  if (
    trimmedValue &&
    trimmedValue.startsWith("/") &&
    !trimmedValue.startsWith("//") &&
    !trimmedValue.includes("\\")
  ) {
    return trimmedValue;
  }

  return "/";
}

export function isSafeHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
