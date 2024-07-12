import { Button } from "@/components/ui/button";
import Logo from "@/components/general/Logo";

function HeaderSimple() {
    return (<div className="bg-blue-950 flex justify-around items-center">
        <Logo />
        <Button>Sign In</Button>
    </div>);
}

export default HeaderSimple;