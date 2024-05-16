import { LucideIcon } from "lucide-react";
import { Calendar, Clock, Earth, MapPin, Wallet } from "lucide-react";

import { cn, formatCurrency, formatDateToRelativeString } from "@/lib/utils";

interface JobDetailsProps {
  details: {
    location: string | null;
    locationType: string;
    type: string;
    salary: number;
    createdAt: Date;
  };
}

interface JobDetailsDataProps {
  label: string;
  icon: LucideIcon;
  value: string;
  hidden?: boolean;
}

export function JobDetails({
  details: { location, locationType, type, salary, createdAt },
}: JobDetailsProps) {
  const jobDetailsData: JobDetailsDataProps[] = [
    {
      label: "Work Location",
      icon: MapPin,
      value: locationType,
    },
    {
      label: "Job Type",
      icon: Clock,
      value: type,
    },
    {
      label: "Salary",
      icon: Wallet,
      value: formatCurrency(salary),
    },
    {
      label: "Posted",
      icon: Calendar,
      value: formatDateToRelativeString(createdAt),
    },
    {
      label: "Location",
      icon: Earth,
      value: location || "Worldwide",
      hidden: true,
    },
  ];

  return (
    <ul className="flex flex-col gap-y-2 text-muted-foreground md:my-1.5 md:flex-row md:gap-x-4">
      {jobDetailsData.map(({ label, icon: Icon, value, hidden }) => (
        <li
          key={label}
          className={cn(
            "flex items-center gap-2 md:gap-1",
            hidden && "md:hidden",
          )}
        >
          <Icon className="size-5 shrink-0" strokeWidth={1.5} />
          <p className="text-sm">{value}</p>
        </li>
      ))}
    </ul>
  );
}
