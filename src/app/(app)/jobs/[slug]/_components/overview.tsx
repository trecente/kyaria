import { formatDate } from "date-fns";
import {
  BriefcaseBusiness,
  Building,
  Calendar,
  Clock,
  Layers,
  LucideIcon,
  MapPin,
} from "lucide-react";

import { formatDateToRelativeString } from "@/lib/utils";

interface OverviewProps {
  details: {
    companyName: string;
    education: string;
    experience: string;
    locationType: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

interface OverviewDataProps {
  title: string;
  icon: LucideIcon;
  value: string;
}

export function Overview({
  details: {
    companyName,
    education,
    experience,
    locationType,
    createdAt,
    updatedAt,
  },
}: OverviewProps) {
  const overviewData: OverviewDataProps[] = [
    {
      title: "Company",
      icon: Building,
      value: companyName,
    },
    {
      title: "Experience",
      icon: Layers,
      value: experience,
    },
    {
      title: "Education",
      icon: BriefcaseBusiness,
      value: education,
    },
    {
      title: "Work Location",
      icon: MapPin,
      value: locationType,
    },
    {
      title: "Last Updated",
      icon: Clock,
      value: formatDateToRelativeString(updatedAt),
    },
    {
      title: "Posted",
      icon: Calendar,
      value: formatDate(createdAt, "dd MMM, yyyy"),
    },
  ];

  return overviewData.map(({ title, icon: Icon, value }) => (
    <div key={title} className="flex flex-col items-center break-all">
      <Icon strokeWidth={1.5} />
      <small className="mt-2 text-center font-medium text-muted-foreground">
        {title}
      </small>
      <p className="text-center text-sm font-semibold">{value}</p>
    </div>
  ));
}
