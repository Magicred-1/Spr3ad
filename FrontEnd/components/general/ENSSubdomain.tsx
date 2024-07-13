import { useReadContract, useWriteContract } from "wagmi";
import { Badge } from "../ui/badge";


function ensSubdomain(address: any) {
    if (!address) {
        return;
    }

    const foundENSSubdomain = "";

    return (
        <div>
            <Badge>{foundENSSubdomain}</Badge>
        </div>
    )
}

export default ensSubdomain;

