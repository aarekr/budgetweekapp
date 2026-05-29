const countDailySpend = (expenseItems) => {
    let dailySum = 0
    for (let i=0; i<expenseItems.length; i++) {
      if (expenseItems[i].amount != undefined) {
        dailySum += expenseItems[i].amount
      }
    }
    return dailySum
}

export default countDailySpend
