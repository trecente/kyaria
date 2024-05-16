import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ApplyButtonProps {
  applicationUrl: string;
  applicationEmail: string;
}

export function ApplyButton({
  applicationUrl,
  applicationEmail,
}: ApplyButtonProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Apply Now</Button>
      </PopoverTrigger>
      <PopoverContent className="w-28 p-0">
        <div className="flex flex-col divide-y">
          <Link
            href={`mailto:${applicationEmail}`}
            className={buttonVariants({
              variant: "ghost",
              className: "rounded-none",
            })}
            prefetch={false}
          >
            Email
          </Link>

          <Link
            href={applicationUrl}
            className={buttonVariants({
              variant: "ghost",
              className: "rounded-none",
            })}
            target="_blank"
          >
            Website
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
