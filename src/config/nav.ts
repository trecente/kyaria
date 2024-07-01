interface NavItem {
  title: string;
  href: string;
}

export const navConfig: NavItem[] = [
  { title: "Sign In", href: "/sign-in" },
  { title: "Post a Job", href: "/jobs/new" },
];
