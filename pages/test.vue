<template>
    <section v-if="hasError" class="container">
        Error.
    </section>
    <section v-else class="container">
        <div>
            <ul v-cloak>
                <li v-for="bpi in bpis" :key="bpi.code"> 
                    {{ bpi.code }} : {{ bpi.rate_float | currencyDecimal }}
                </li>
            </ul>
        </div>
    </section>
</template>



<script>
// export default {
//     data() {
//         return {
//             bpis: null,
//             hasError: true
//         }
//     },
//     asyncData({ $axios }) {
//         // 取得先URL
//         const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
//         return $axios.get(url)
//             .then((res) => {
//                 return { bpis: res.data.bpi, hasError: false }
//             })
//             .catch((e => {
//                 console.log(e)
//                 return { hasError: true }
//             }))
        
//     },
//     filters: {
//         currencyDecimal(value) {
//             return value.toFixed(2)
//         }
//     }
    
// }
</script>

<style scoped>
[v-cloak] {
    display: none;
}
</style>