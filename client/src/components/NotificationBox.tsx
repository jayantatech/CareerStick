import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface NotificationBoxProps {
  message: string;
}

export function NotificationBox({ message }: NotificationBoxProps) {
  return (
    <Alert
      variant="default"
      className="my-4 rounded border-amber-500 bg-amber-50 text-amber-900"
    >
      <AlertCircle className="h-4 w-4 text-amber-500" />
      <AlertTitle className="text-amber-900 font-semibold font-heading ">
        Attention Required
      </AlertTitle>
      <AlertDescription className="text-amber-800 font-body">
        {message}
      </AlertDescription>
    </Alert>
  );
}
