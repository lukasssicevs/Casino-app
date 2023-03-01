import { Document } from "@contentful/rich-text-types"

export interface ICMSData {
    installDescription: Document
    connectionDescription: Document
    notifications: INotifications
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
