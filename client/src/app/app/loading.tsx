export default function SubLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
        <p className="text-sm text-muted-foreground">Loading for app...</p>
      </div>
    </div>
  );
}
