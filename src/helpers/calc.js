export const calcSubPrice = (item) => {
    return item.count * item.productOne.price
}
export const calcTotalPrice = (tours) => {
    let totalPrice = 0
    tours.forEach(item => {
        totalPrice += item.subPrice
    })
    return totalPrice
}