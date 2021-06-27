import { flattenDeep, template, templateSettings } from "lodash";

templateSettings.interpolate = /{{([\s\S]+?)}}/g;

export function createPath(
  pathTemplate: readonly any[],
  parameters: any = {}
): string {
  return template(
    flattenDeep(pathTemplate)
      .map((item: string): string =>
        item.endsWith("/") ? item.slice(0, item.length - 1) : item
      )
      .join("/")
      .concat("/")
  )(parameters);
}
