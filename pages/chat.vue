<template>
    <main class="main-container">
        <div class="chat-timeline">
            <Balloon
            v-for="chat of chatLogs" :key = chat.message 
            :speaker = "chat.speaker"
            :name = "chat.name"
            :message = "chat.message"
            />
        </div>
        <ChatForm
            @submit-message="submit"
            apply-event="submit-message"
            />
    </main>
</template>

<script>
import Balloon from '~/components/Balloon'
import ChatForm from '~/components/ChatForm'

export default {
    components: {
        balloon: Balloon,
        chatForm: ChatForm
    },
    data () {
        return {
            chatLogs: [
                { name: 'me', speaker: 'my', message: 'hello'.repeat(2) },
                { name: 'bot', speaker: 'other', message: 'hello world' }

            ]
        }
    },
    methods: {
        submit (value) {
            this.chatLogs.push({
                name: '私だよ',
                speaker: 'my',
                message: value
            })

            this.botSubmit();
            this.scrollDown();
        },
        botSubmit () {
            setTimeout(() => {
                this.chatLogs.push({
                    name: 'bot',
                    speaker: 'other',
                    message: '返答は一種類です。'
                })

                this.scrollDown();
            }, 1000)
        },
        scrollDown () {
            const target = this.$el.querySelector('.chat-timeline');
            setTimeout(() => {
                const height = target.scrollHeight - target.offsetHeight;
                target.scrollTop += 10;

                if (height <= target.scrollTop) {
                    return;
                } else {
                    this.scrollDown();
                }
            } , 0);
        }
    }
}
</script>