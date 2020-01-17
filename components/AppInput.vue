<template>
  <div class="app_input__container">
    <p>{{ innerLabel }}</p>
    <input
      class="app_input"
      :type="type"
      :value="value"
      @input="updateValue"
    >
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  props: {
    innerLabel: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number],
      default: null
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.app_input__container {
  padding: 1rem 0;
}
.app_input {
  width: 100%;
  font-size: 1.6rem;
  padding: .5rem;
  border: .1rem solid $color-black;
  border-radius: .5rem;
}
</style>
