export async function GET(request) {
  return new Response(JSON.stringify({ message: "Hello, world! this is from Rest" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
