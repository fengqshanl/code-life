import emitter from '@/utils/emitter'
import eventBus from "@/utils/event-bus"

export default {
  mixins: [emitter],
  created() {},
  methods: {
    editEventHandler(eventName, eventParams, eventParams2) {
      this.dispatch('SettingPanel', 'editEventHandler', [eventName, [...eventParams], eventParams2])
    },

  }
}
