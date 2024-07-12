import { Button } from "@/components/ui/button";
import Logo from "@/components/general/Logo";
import {
    DynamicWidget,
  } from "@dynamic-labs/sdk-react-core";
  
function Header() {
    return (<div className="bg-blue-950 flex justify-around items-center">
        <Logo />
        <div className="flex items-center">
            {[
                { name: "Discover", link: "/discover" },
                { name: "Create", link: "/create" },
                { name: "Browse", link: "/browse" }]
                .map((item, index) => (
                    <a key={index} href={item.link} className="text-white p-2 hover:bg-blue-900">
                        {item.name}
                    </a>
                ))}
        </div>
        <DynamicWidget />

    </div>);
}

export default Header;