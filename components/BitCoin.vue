<template>
    <div>
        <div v-if="hasError">
            Error...
        </div>
        <div v-else>
            <div v-if="loading">
                Loading...
            </div>
            <div v-else class="text-ani">
                <ul v-cloak>
                    <li>
                        Bitcoin Price
                    </li>    
                    <li v-for="bpi in bpis" :key="bpi.code"> 
                        {{ bpi.code }} : {{ bpi.rate_float | currencyDecimal }}
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

<style lang="scss" scoped>

[v-cloak] {
    display: none;
}

.text-ani {
    width: 100%;
    padding-left: -40px;   
    background:gray;        
    overflow:hidden;

    ul {
        margin: 0;
        padding-left: 100%;
        display: inline-block;
        white-space: nowrap;
        animation: flowing 18s linear infinite;
        transform: translateX(0);

        @keyframes flowing {
            100% {
                transform: translate(-100%)
            }
            
        }

        li {
            display: inline;
            margin: 0 100px 0 0;
            font-size: 1.2em;
            color: #fff;
        }
    }
}
</style>