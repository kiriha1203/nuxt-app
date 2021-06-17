<template>
    <div v-bind:class="{topBox: isActive}">
        <burger-button
        :active="isActive"
        :bar-color = "isActive? 'red':'black'"
        :bar-height = "3"
        :bar-width = "20"
        @click="isActive = !isActive"
        />
        <div v-if="isActive" class="chatBox">
            <h1>Todo App</h1>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return { 
            isActive: false
        }
    }
}
</script>

<style lang="scss" scoped>
.topBox {
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    align-items: flex-end;
    width: 20vw;
    height: 100%;
    background-color: blue;
}

.chatBox {
    display: flex;
    width: 20vw;
    height: 60vh;
    background-color: blue;
}

</style>