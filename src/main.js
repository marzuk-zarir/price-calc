import Alpine from 'alpinejs'

window.Alpine = Alpine

window.addEventListener('DOMContentLoaded', () => {
    Alpine.start()
    console.log('Alpine.js is ready!')
})

window.addEventListener('alpine:init', () => {
    Alpine.data('calculator', () => ({
        originalPrice: '',
        quantity: '1',
        productWeight: '',
        perKgPrice: '',
        localDeliveryCharge: '',
        profitInPercent: '',

        singleUnitBp: 0,
        singleUnitSp: 0,
        singleUnitProfit: 0,

        totalBp: 0,
        totalSp: 0,
        totalProfit: 0,

        isCalculated: false,

        calculateHandler() {
            // convert string to number
            this.originalPrice = parseFloat(this.originalPrice)
            this.quantity = parseInt(this.quantity)
            this.productWeight = parseFloat(this.productWeight)
            this.perKgPrice = parseFloat(this.perKgPrice)
            this.localDeliveryCharge = parseFloat(this.localDeliveryCharge)
            this.profitInPercent = parseFloat(this.profitInPercent)

            // validate input
            if (
                isNaN(this.originalPrice) ||
                isNaN(this.quantity) ||
                isNaN(this.productWeight) ||
                isNaN(this.perKgPrice) ||
                isNaN(this.localDeliveryCharge) ||
                isNaN(this.profitInPercent)
            ) {
                alert('Please enter valid numbers')
                return
            }

            // total
            this.totalBp = Math.floor(
                this.originalPrice * this.quantity +
                    this.productWeight * this.perKgPrice * this.quantity +
                    this.localDeliveryCharge
            )
            this.totalSp = Math.floor(this.totalBp + (this.totalBp * this.profitInPercent) / 100)
            this.totalProfit = this.totalSp - this.totalBp

            // single unit
            this.singleUnitBp = Math.floor(this.totalBp / this.quantity)
            this.singleUnitSp = Math.floor(this.totalSp / this.quantity)
            this.singleUnitProfit = this.singleUnitSp - this.singleUnitBp

            this.isCalculated = true
        }
    }))
})
