<template>
    <div class="helper">
        <span class="left">{{unFinishedTodoLength}} items left</span>
        <div class="tabs">
            <span
                v-for="state in states"
                :key="state"
                :class="[state, filter === state ? 'actived' : '']"
                @click="toggleFilter(state)"
            >
                {{state}}
            </span>
        </div>
        <span class="clear" @click="clearCompleted">Clear Completed</span>
    </div>
</template>
<script>
export default {
    props: {
        filter: {
            type: String,
            required: true,
        },
        todos: {
            type: Array,
            required: true
        }
    },
    computed: {
        unFinishedTodoLength() {
            return this.todos.filter(todo => !todo.completed).length
        }
    },
    data() {
        return {
            states: ['all', 'active', 'completed']
        }
    },
    methods: {
        toggleFilter(state) {
            this.$emit('toggle', state)
        },
        clearCompleted() {
            this.$emit('clearAllCompleted')
        }
    }
}
</script>
<style lang="stylus" >
    .helper {
        font-weight 100
        display flex
        justify-content space-between
        padding 5px 0
        line-height 30px
        background-color #ffffff
        font-size 14px
        font-smoothing: antialiased;
    }
    .left, .clear, .tabs {
        padding 0 10px
        box-sizing border-box
        font-weight 300
    }
    .left, .clear {
        width 150px
    }
    .left {
        text-align left
    }
    .clear {
        text-align: right
        cursor pointer
        span:hover {
            font-weight 700    
        }
    }
    .tabs {
        width 200px
        display flex
        justify-content space-around
        * {
            display inline-block
            padding 0 10px
            cursor pointer
            border 1px solid rgba(175, 47, 47, 0)
            &.actived {
                border-color rgba(175, 47, 47, 0.4)
                border-radius 5px
            }
        }
    }
    span:hover {
        text-shadow: 1px 0 0;
    }
</style>