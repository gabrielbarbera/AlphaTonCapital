import { collection, config, fields } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    news: collection({
      label: "News Articles",
      path: "content/news/*/",
      slugField: "title",
      columns: ["title", "date", "published"],
      schema: {
        title: fields.slug({
          name: { label: "Title" },
        }),
        date: fields.date({ label: "Date" }),
        sources: fields.array(
          fields.object({
            name: fields.text({ label: "Source Name" }),
            url: fields.url({ label: "Source URL" }),
          }),
          {
            label: "Sources",
            itemLabel: (item) => {
              const itemValue = item as
                | { name?: string; url?: string }
                | undefined;
              return itemValue?.name || "Source";
            },
          }
        ),
        summary: fields.text({
          label: "Summary",
          multiline: true,
        }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
          tables: true,
        }),
        published: fields.checkbox({
          label: "Published",
          defaultValue: true,
        }),
      },
    }),
  },
});
