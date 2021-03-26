<template>
  <div :class="'col-md-'+colLength" @click="click_btn">
    <div class="card">
      <div class="card-body">
        <i v-if="icon" :class="icon" style="font-size: 40px; color: #8dc351"></i>
        <img v-if="img" :src="img" height="50">
      </div>
      <div class="card-footer">
        <div>{{name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "paymentMethod",
        props: {
            name: {type: String, required: false},
            icon: {type: String, required: false},
            img: {type: String, required: false},
            colLength: {type: Number, required: false, default: 3}
        },
        methods: {
            click_btn: function () {
                this.$emit('clickBtn');
            }
        }
    }
</script>

<style scoped>
  .dark-theme .card {
    background-color: #15161e;
    border: 1px solid #30363d;
  }

  .dark-theme .card-footer {
    background-color: #0d0d12;
    border-top: 1px solid #30363d;
  }


  .card {
    display: flex;
    align-items: center;
    margin-top: 20px;
    cursor: pointer;
  }

  .card-footer {
    width: 100%;
    text-align: center;
  }

</style>