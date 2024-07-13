import { Button } from "@/components/ui/button";
import Logo from "@/components/general/Logo";
import {
    DynamicWidget,
  } from "@dynamic-labs/sdk-react-core";
  
function Header() {
    return (<div className="bg-blue-950 flex justify-around items-center w-full">
        {/* <Logo /> */}
        <div className="flex items-center">
            {[
                { name: "Feed", link: "/" },
                { name: "Post", link: "/post" },
                ]
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