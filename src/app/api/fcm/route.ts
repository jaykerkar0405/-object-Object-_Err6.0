import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, token } = await req.json();

    if (!userId || !token) {
      return new Response(
        JSON.stringify({ error: "Missing userId or token" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await prisma.fCMToken.upsert({
      where: { userId },
      update: { token },
      create: { userId, token },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error saving FCM token:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
