const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type RequestWithRetryOptions = {
  attempts?: number;
  baseDelayMs?: number;
};

export async function requestWithRetry(
  fetcher: () => Promise<Response>,
  { attempts = 3, baseDelayMs = 1200 }: RequestWithRetryOptions = {},
) {
  let attempt = 0;

  while (attempt < attempts) {
    const response = await fetcher();
    if (response.ok) {
      return response;
    }

    const isServerError = response.status >= 500 && response.status < 600;
    let errorMessage: string | undefined;

    try {
      const data = await response.json();
      errorMessage = data?.error;
    } catch {
      // Ignore JSON parsing failures from non-JSON error responses.
    }

    if (isServerError && attempt < attempts - 1) {
      await sleep(baseDelayMs * Math.pow(2, attempt));
      attempt += 1;
      continue;
    }

    throw new Error(errorMessage || `Request failed with status ${response.status}`);
  }

  throw new Error("Request failed after multiple attempts");
}
