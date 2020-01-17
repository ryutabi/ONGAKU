<template>
  <div class="app_textaria__container">
    <p>{{ innerLabel }}</p>
    <textarea
      class="app_textaria"
      :cols="cols"
      :rows="rows"
      @input="updateValue"
    />
  </div>
</template>

<script>
export default {
  name: 'AppTextaria',
  props: {
    innerLabel: {
      type: String,
      default: ''
    },
    cols: {
      type: Number,
      default: 20
    },
    rows: {
      type: Number,
      default: 5
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
.app_textaria__container {
  padding: 1rem 0;
}

.app_textaria {
  width: 100%;
  height: 10rem;
  font-size: 1.6rem;
  padding: .5rem;
  border: .1rem solid $color-black;
  border-radius: .5rem;
}

</style>
