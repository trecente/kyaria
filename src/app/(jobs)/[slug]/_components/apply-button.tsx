import { ArrowRight } from "lucide-react";
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
        <Button
          className={buttonVariants({
            variant: "secondary",
            className: "hidden sm:flex",
          })}
        >
          Apply Now <ArrowRight className="ml-1" strokeWidth={2} size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32 p-0">
        <div className="flex flex-col">
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
          <div className="border-b" />
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
