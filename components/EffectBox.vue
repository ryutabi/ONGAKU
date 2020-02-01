<template>
  <div
    class="effect_box__container"
    :class="{ is_active: isActive }"
    @click="handleClick"
  >
    <p>{{ effectLabel }}</p>
  </div>
</template>

<script>
export default {
  props : {
    isActive: {
      type: Boolean,
      default: false
    },
    effectLabel: {
      type: String,
      default: null,
      required: true
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
.effect_box__container {
  width: 10rem;
  height: 6rem;
  line-height: 6rem;
  text-align: center;
  border: .2rem solid $color-white;
  border-radius: .8rem;
  color: $color-white;
  font-size: 1.4rem;
}

.is_active {
  background-color:$color-white;
  color: $color-black;
}
</style>
