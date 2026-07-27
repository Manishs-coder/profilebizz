const DEFAULT_API_ORIGIN = "https://profile-biz-design.replit.app";

export async function onRequest(context) {
  const apiOrigin = context.env.API_ORIGIN || DEFAULT_API_ORIGIN;
  const requestUrl = new URL(context.request.url);
  const path = Array.isArray(context.params.path)
    ? context.params.path.join("/")
    : context.params.path || "";
  const upstreamUrl = new URL(`/api/${path}`, apiOrigin);
  upstreamUrl.search = requestUrl.search;

  const headers = new Headers(context.request.headers);
  headers.delete("host");

  return fetch(
    new Request(upstreamUrl, {
      method: context.request.method,
      headers,
      body:
        context.request.method === "GET" || context.request.method === "HEAD"
          ? undefined
          : context.request.body,
      redirect: "manual",
    }),
  );
}
