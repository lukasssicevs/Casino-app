import { Document } from "@contentful/rich-text-types"
import { Asset } from "contentful"

export interface ICMSData {
    installDescription: Document
    connectionDescription: Document
    notifications: INotifications
    logo: {
        image: Asset
    }
}

export interface INotifications {
    waiting: string
    confirmed: string
    insufficientFunds: string
    inappropriateAmount: string
    exceedingWithdrawal: string
    insufficientAllowance: string
    noWallet: string
}
