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
            <div class="chat-timeline">
            <Balloon
            v-for="chat of chatLogs" :key = chat.message 
            :speaker = "chat.speaker"
            :name = "chat.name"
            :message = "chat.message"
            />
        </div>
        <!-- <ChatForm
            @submit-message="submit"
            apply-event="submit-message"
            /> -->
        </div>
    </div>
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
            isActive: false,
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

<style lang="scss" scoped>

.topBox {
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    align-items: flex-end;
    width: 40vw;
    height: 100%;
    border-radius: 10px;
    border: solid;
    background-color: #88A4D4;
}

.chatBox {
    width: 40vw;
    height: 60vh;
    border-radius: 10px;

    .chat-timeline {
        top: 0;
        bottom: 40px;
        left: 0;
        right: 0;
        padding: 30px 0; 
        display: flex;
        flex-direction: column;

        .conversation-balloon {
            margin-bottom: 30px;
        }
    }
}


</style>