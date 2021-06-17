<template>
    <div class="conversation-balloon" :class="speaker">
        <div class="avatar">
            <img src="@/assets/avatar.svg">
            <p class="name">{{ name }}</p>
        </div>
        <p class="message">{{ message }}</p>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        speaker: {
            type: String,
            required: true,
            validator: value => {
                return ['my', 'other'].includes(value);
            }
        },
        message: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss">
$my-balloon-color: #85FF49;
$other-balloon-color: #FFFFFF;

.conversation-balloon {
    &.my {
        text-align: right;
        
        .avatar {
            float: right;
        }

        .message {
            margin-top: 20px;
            margin-right: 20px;
            background-color: $my-balloon-color;
            text-align: left;


            &::before {
                right: -20px;
                transform: rotate(-25deg);
                border-left: 18px solid $my-balloon-color;
            }
        }
    }

    &.other {
        text-align: left;
        
        .avatar {
            float: left;
        }

        .message {
            margin-top: 20px;
            margin-right: 20px;
            background-color: $other-balloon-color;

            &::before {
                left: -20px;
                transform: rotate(200deg);
                border-left: 18px solid $other-balloon-color;
            }
        }
    }

    .avatar {
        width: 80px;

        &::after {
            clear: both;
        }

        img {
            display: block;
            margin: 0 auto;
            width: 60px;
            height: 60px;
            border-radius: 50%;

            margin-bottom: 5px;
        }

        .name {
            width: 100%;
            text-align: center;
            color: white;
            font-size: 0.8rem;
            word-wrap: break-word;
        }
    }

    .message {
        display: inline-block;
        max-width: 280px;
        padding: 10px 30px;
        border-radius: 30px;
        font-size: 1.3rem;
        min-height: 30px;
        word-wrap: break-word;
        position: relative;

        &::before {
            content: '';
            display: block;
            position: absolute;
            top: 5px;
            border: 8px solid transparent;
        }
    }
}
</style>