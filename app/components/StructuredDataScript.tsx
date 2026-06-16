import { getStructuredDataGraph } from "../lib/structured-data";

/** JSON-LD rendu de façon safe — ne crash jamais le layout. */
export default function StructuredDataScript() {
  let json = "{}";
  try {
    json = JSON.stringify(getStructuredDataGraph());
  } catch {
    json = "{}";
  }

  return (
    <script type="application/ld+json" suppressHydrationWarning>
      {json}
    </script>
  );
}
