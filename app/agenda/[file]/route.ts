import { getEvents } from "@/lib/content";
import { buildIcs } from "@/lib/calendar";

// Un fichier .ics par événement publié, généré au build : /agenda/<id>.ics
export const dynamic = "force-static";
export const dynamicParams = false;

async function allEvents() {
  const { upcoming, past } = await getEvents();
  return [...upcoming, ...past];
}

export async function generateStaticParams() {
  return (await allEvents()).map((event) => ({ file: `${event.id}.ics` }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const event = (await allEvents()).find((e) => `${e.id}.ics` === file);
  if (!event) return new Response("Événement introuvable", { status: 404 });

  return new Response(buildIcs(event), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${event.id}.ics"`,
    },
  });
}
