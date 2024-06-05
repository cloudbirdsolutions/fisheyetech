import Typography from "@mui/joy/Typography";
import { useAuth } from '@/app/hooks/useAuth';

export default function JobAllocationLayout ({children}: Readonly<{
    children: React.ReactNode;
}>){

    return (
        <>
            <Typography level={'h2'}>New Job Allocation</Typography>
            {children}
        </>
    )

}