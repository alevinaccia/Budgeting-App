export const validate = (transaction) => {
    return transaction.value != 0 && transaction.msg != "" && transaction.typeOf != ""
}