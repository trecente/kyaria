interface NavItem {
  title: string;
  href: string;
}

export const navConfig: NavItem[] = [
  { title: "Sign In", href: "/signin" },
  { title: "Post a Job", href: "/jobs/new" },
];
