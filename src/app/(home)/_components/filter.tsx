import { FilterForm } from "./filter-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getDistinctLocations } from "@/lib/fetchers";

export async function Filter() {
  const locations = await getDistinctLocations();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Filter</CardTitle>
      </CardHeader>
      <CardContent>
        <FilterForm locations={locations} />
      </CardContent>
    </Card>
  );
}
