<template>
    <div class="chat-form">
        <div class="form-container">
            <input type="text" class="message" v-model="message">
            <button class="submit" @click="submit">送信</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        applyEvent: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            message: ''
        }
    },
    methods: {
        submit () {
            this.$emit(this.applyEvent, this.message)
            this.message = '';
        }
    }
}
</script>

<style lang="scss" scoped>
button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;
}

.form-container {
    position: relative;
    height: 40px;

    .message {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 80px;
        width: 80%;
        font-size: 1.3rem;
        padding: 0 20px;
    }

    .submit {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;

        width: 80px;
        text-align: center;
        background-color: #4F83E1;
        color: white;
        font-size: 1.6rem;
    }
}

</style>