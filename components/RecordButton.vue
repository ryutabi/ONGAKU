<template>
  <div
    class="record_button__wrapper"
    @click="handleClick"
  >
    <div class="record_button__container">
      <div
        v-if="!isActive"
        class="record_button--inactive"
      />
      <div 
        v-if="isActive"
        class="record_button--active"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }

}
</script>

<style scoped lang="scss">
.record_button {
  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    border: .2rem solid #fff;
  }

  &--inactive {
    width: 4.2rem;
    height: 4.2rem;
    border-radius: 50%;
    background-color: #f00;
  }

  &--active {
    width: 2rem;
    height: 2rem;
    border-radius: .3rem;
    background-color: #f00;
  }

}
</style>
