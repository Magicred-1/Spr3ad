import { Button } from "@/components/ui/button";
import Logo from "@/components/general/Logo";

function HeaderSimple() {
    return (<div className="bg-blue-950 flex justify-around items-center w-full py-2 px-8 rounded-lg">
        <Logo />
        <Button>Sign In</Button>
    </div>);
}

export default HeaderSimple;