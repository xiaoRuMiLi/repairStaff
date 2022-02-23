<template>
    <div class="wrapper">
        <div class="content">
            {{content}}
        </div>
        <div class="bottom">
            <div class="num">
                <span>{{charactersNumber}}</span><span>/{{maxCharactersNumber}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {

        name: 'remarks',

        components: {
        },

        props: {
            content: {
                type: String,
                default: '',
            },
            maxCharactersNumber: {
                type: Number,
                default: 500,
            }

        },

        data() {
            return {
                text: this.content,

            }
        },

        computed: {
            charactersNumber() {
                return this.content.length;
            },

        },

        watch: {},

        created() {},

        mounted() {},

        unmounted() {},

        methods: {

        },
    }
</script>
<style scoped>
.wrapper {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    padding: 20px;
    line-height: 24px;
    text-align: left;
    box-sizing: border-box;
}
.content {
    color: #999999;
    border-radius: 5px;
    background-color: ;
}
.bottom {
    text-align: right;
    color: #c8c9cc;
}

</style>