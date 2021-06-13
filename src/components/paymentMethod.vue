<template>
  <div class="d-flex donate-item justify-content-between" @click="click_btn">
    <div class="donate-img">
      <i v-if="icon" :class="icon" style="font-size: 28px; color: #8dc351"></i>
      <img v-if="img" :src="img" height="28">
    </div>
    <div class="align-self-center w-100">{{name}}</div>
    <i class="bi-chevron-right align-self-center"></i>
  </div>
</template>

<script>
    export default {
        name: "paymentMethod",
        emits: ['clickBtn'],
        props: {
            name: {type: String, required: false},
            icon: {type: String, required: false},
            img: {type: String, required: false},
        },
        methods: {
            click_btn: function () {
                this.$emit('clickBtn');
            }
        }
    }
</script>

<style scoped>

  .donate-item{
    cursor: pointer;
  }

  .donate-img{
    margin-right: 14px;
  }

  .dark-theme .card {
    background-color: #15161e;
    border: 1px solid #30363d;
  }

  .dark-theme .card-footer {
    background-color: #0d0d12;
    border-top: 1px solid #30363d;
  }

</style>