<template>
    <div id="app">
        <div id="cover"></div>
        <Header />
        <Todo />
        <Foolter />
    </div>
</template>

<script>
import Header from "./todo/header.vue"
import Foolter from "./todo/foolter.jsx"
import Todo from "./todo/todo.vue"
export default {
    data(){
        return {

        }
    },
    components: {
        Header,
        Foolter,
        Todo
    }
}
</script>

<style lang="stylus" >
    #app {
        position: absolute
        left: 0
        right: 0
        top: 0
        bottom: 0
    }
    /* 背景虚化 */
    #cover {
        position: fixed
        left: 0
        right: 0
        top: 0
        bottom: 0
        background-color: #999
        opacity: .3
        z-index: -1
    }

</style>
