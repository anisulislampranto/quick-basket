import { AlertDialog, AlertDialogContent, AlertDialogTrigger} from "@/components/ui/alert-dialog"

export function AlertWrapper({openButton, children}) {

    return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            {openButton}
        </AlertDialogTrigger>
        <AlertDialogContent>
            {children}
        </AlertDialogContent>
    </AlertDialog>
    )
}
