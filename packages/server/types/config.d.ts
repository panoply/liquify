import { Specification } from "./specification";

export interface Config {
  engine: "standard" | "shopify" | "jekyll";
  specification: Specification;
  strictSpec: boolean;
}
