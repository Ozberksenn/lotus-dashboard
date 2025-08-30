import { FC, ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
interface AlertDialogProps {
  title?: string;
  description?: string;
  trigger: ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export const AppAlertDialog: FC<AlertDialogProps> = ({
  title,
  description,
  trigger,
  onCancel,
  onConfirm,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title ?? "Are you sure"}</AlertDialogTitle>
          {description != null ? (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          ) : (
            <div></div>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
