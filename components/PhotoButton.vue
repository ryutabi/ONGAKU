<template>
  <div class="photo_button__container">
    <div class="photo_button--outside">
      <div
        class="photo_button--inside"
        @click="handleClick"
      />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }

}
</script>

<style lang="scss" scoped>
.photo_button {
  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &--outside {
    display: flex;
    justify-content: center;
    align-items: center;
    border: .2rem solid $color-white;
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
  }

  &--inside {
    border: .3rem solid $color-white;
    border-radius: 50%;
    background-color: $color-white;
    width: 4.2rem;
    height: 4.2rem;
    transition: .2s;

    &:active {
      height: 3.8rem;
      width: 3.8rem;
    }
  }
}
</style>
