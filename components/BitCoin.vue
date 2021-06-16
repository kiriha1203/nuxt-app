<template>
    <div>
        <div v-if="hasError">
            Error...
        </div>
        <div v-else>
            <div v-if="loading">
                Loading...
            </div>
            <div v-else>
                <ul v-cloak>
                    <li v-for="bpi in bpis" :key="bpi.code"> 
                        {{ bpi.code }} : {{ bpi.rate_float | currencyDecimal }}
                    </li>
                    <li>
                        Powered by <a class="coinLink" href="https://www.coindesk.com/price/bitcoin">CoinDesk</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios')
// 取得先URL
const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

export default {
    data() {
        return {
            bpis: null,
            hasError: false,
            loading: true,
        }
    },
    mounted: function() {
        // 取得先URL    
        axios.get(url)
            .then((res) => {
                this.bpis = res.data.bpi
                this.hasError = false
                this.loading = false 
            })
            .catch((e => {
                console.log(e)
                this.hasError = true 
                this.loading = true
            }))
        
    },
    filters: {
        currencyDecimal(value) {
            return value.toFixed(2)
        }
    }
    
}
</script>

<style scoped>
[v-cloak] {
    display: none;
}
a.coinLink {
    color: aqua;
}
</style>