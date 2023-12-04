import React from 'react';
import {QuestWidget} from "@bandit-network/quest-widget";
import {useConnectModal} from "@rainbow-me/rainbowkit";
import {useSignatureContext} from "~/context/SignatureContext";

interface BanditQuestProps {
    isOpen: boolean;
    collectionId: number;
    onClose: () => void;
}

const BanditQuest = ({isOpen, collectionId, onClose}: BanditQuestProps) => {
    const {openConnectModal} = useConnectModal();
    const {signature} = useSignatureContext()
    return (
        <div className="flex items-center justify-center p-2">
            {
                <QuestWidget
                    isOpen={isOpen}
                    dialog={false}
                    collectionId={collectionId}
                    onClose={onClose}
                    walletSettings={{
                        customSignature: true,
                        signature
                    }}
                    onConnectClick={openConnectModal as () => void}
                />
            }
        </div>
    );
};

export default BanditQuest;
