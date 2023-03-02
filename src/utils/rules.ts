type RuleParam = number | string

export const jackpotRule = (number: RuleParam) => (Number(number) / 10) * 9

export const checkAppropriateness = (
    number: RuleParam,
    min?: RuleParam,
    max?: RuleParam
) => {
    switch (true) {
        case !number:
            return false
        case !!min && !!max:
            return (
                Number(min) <= Number(number) && Number(number) <= Number(max)
            )
        case !!min:
            return Number(min) < Number(number)
        default:
            return Number(number) > 0
    }
}
