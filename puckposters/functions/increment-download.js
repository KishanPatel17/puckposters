export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // Parse the JSON
    const body = await request.json();
    const team = body.team || "UNKNOWN";
    const month = body.month || "UNKNOWN";

    // Simple Key
    const key = `${team}-$month`;
    const totalKey = "global-total";

    // Read the existing counts
    const prevCount = parseInt((await env.DOWNLOADS_KV.get(key)) || "0", 10);
    const prevTotal = parseInt(
      (await env.DOWNLOADS_KV.get(totalKey)) || "0",
      10
    );

    // Increment both
    const newCount = prevCount + 1;
    const newTotal = prevTotal + 1;

    // Save to KV
    await env.DOWNLOADS_KV.put(key, newCount.toString());
    await env.DOWNLOADS_KV.put(totalKey, newTotal.toString());

    return new Response(JSON.stringify({ key, newCount, newTotal }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
