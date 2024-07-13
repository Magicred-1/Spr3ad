import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { useEffect, useState } from "react";

const onSuccess = async (response: any) => {
  console.log({ response });
};

export default function WorldcoinButton() {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    verify();
  }, []);

  const handleVerify = async (proof: any) => {
    localStorage.setItem("proof", JSON.stringify(proof));
    setIsVerified(true);
  };

  const verify = () => {
    const proof = localStorage.getItem("proof");
    setIsVerified(!!proof);
  };

  return (
    <>
      {isVerified ? (
        "You are verified with World ID"
      ) : (
        <div>
          <IDKitWidget
            app_id="app_793bb31133a866cdf69dc25bae91c46b" // obtained from the Developer Portal
            action="test" // this is your action id from the Developer Portal
            onSuccess={onSuccess} // callback when the modal is closed
            handleVerify={handleVerify} // optional callback when the proof is received
            verification_level={VerificationLevel.Device}
          >
            {({ open } : {open: any}) => (
              <button
                className="cursor-pointer border-none px-5 py-2 rounded-md w-fit mx-auto bg-black hover:opacity-90 hover:bg-black transition text-white"
                onClick={open}
              >
                Verify with World ID
              </button>
            )}
          </IDKitWidget>
        </div>
      )}
    </>
  );
}
