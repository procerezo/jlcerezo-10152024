<script setup lang="ts">
import { ref } from 'vue';
const show = ref(false);
const emit = defineEmits(['close']);
const close = () => {
  show.value = false;
  emit('close');
};
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

</script>

<template>
  <div class="modal" v-if="show" @click.self="close">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <slot name="header"></slot>
        <button @click="close" class="close-button">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.modal-body {
  margin-bottom: 15px;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
}
.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>