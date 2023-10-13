
export default {

    created() {
        this.handleOnCreated()
    },

    mounted() {
        this.handleOnMounted()
    },

    methods: {
        handleOnCreated() {
            if (!!this.field.options.onCreated) {
                let customFunc = new Function(this.field.options.onCreated)
                customFunc.call(this)
            }
        },

        handleOnMounted() {
            if (!!this.field.options.onMounted) {
                let mountFunc = new Function(this.field.options.onMounted)
                mountFunc.call(this)
            }
        },

    }
}
