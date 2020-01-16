<template>
  <div>
    <button
      :class="buttonClasses"
      :type="type"
      @click="handleClick"
    >
      {{ text }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'button',
      validator(val) {
        return [
          'button',
          'submit'
        ].includes(val)
      }
    },
    color: {
      type: String,
      default: '',
      validator(val) {
        return [
          '',
          'red',
          'gray'
        ].includes(val)
      }
    }
  },
  computed: {
    buttonClasses() {
      if (!this.color) {
        return
      }
      const styles = { app_button: true }
      styles[`is_${this.color}`] = true
      return styles
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
  .app_button {
    padding: 1rem 2rem;
    border-radius: 3rem;
    font-size: 1.4rem;
    transition: 0.2s all;

    &:hover,
    &:focus {
      cursor: pointer;
      opacity: 0.6;
    }
  }

  .is_red {
    border: .1rem solid $color-primary;
    background-color: $color-primary;
    color: $color-white;
  }

  .is_gray {
    border: .1rem solid $color-gray;
    background-color: $color-gray;
    color: $color-white;
  }
</style>
