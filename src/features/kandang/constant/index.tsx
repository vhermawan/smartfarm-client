import { Anchor } from "@mantine/core";

export const BREADCUMB = [
  { title: 'Dashboard', href: 'dashboard' },
  { title: 'Kandang', href: 'kandang' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));