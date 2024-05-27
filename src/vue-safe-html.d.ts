declare module "vue-safe-html" {
  import { Plugin } from "vue";

  declare const plugin: Plugin;
  export default plugin;

  export const allowedTags: string[];
}
