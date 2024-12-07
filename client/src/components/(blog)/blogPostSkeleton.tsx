import { Card, CardContent } from "../ui/card";

export function SmallPostSkeleton() {
  return (
    <Card className="overflow-hidden rounded-md border shadow-md">
      <CardContent className="p-0">
        <div className="relative h-[200px] bg-gray-100 animate-pulse" />
        <div className="p-6 h-[132px] max-md:h-auto bg-white">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-3" />
          <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}

export function BigPostSkeleton() {
  return (
    <Card className="overflow-hidden rounded-lg border shadow-lg">
      <CardContent className="p-0">
        <div className="relative h-[300px] bg-gray-200 animate-pulse" />
        <div className="p-6">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-3" />
          <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}
