<template>
     <div class="head">
            <h1>Todo App</h1>
            <HeaderLink />
    </div>
</template>

<script>
import HeaderLink from '~/components/HeaderLink'
export default {
    components: {
        HeaderLink,
    }
    
}
</script>

<style>
.head {
	color: #fff;
	padding: 20px;
	background-color: #527b8e;
}
</style>
