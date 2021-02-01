`
<template>

  <div
    style="width: 4rem; padding: 1rem 1.3rem; height: 100vh; display: flex; flex-direction: column-reverse;  float: left; background-color: #fcfcfc ">
    <ul style="list-style: none; width: 50px; padding-inline-start: 0px;">
      <li style="    margin-bottom: 20px;"><i class="bi-house" style="font-size: 1.4rem; "></i></li>
      <li style="    margin-bottom: 20px;"><i class="bi-calendar-event" style="font-size: 1.4rem; "></i></li>
      <li style="    margin-bottom: 20px;"><i class="bi-sliders" style="font-size: 1.4rem; "></i></li>
      <li style="    margin-bottom: 20px;"><i class="bi-gift" style="font-size: 1.4rem; "></i></li>
      <li style="    margin-bottom: 20px;"><i class="bi-info-square" style="font-size: 1.4rem; "></i></li>

      <!--      <li style="    margin-bottom: 10px;"><i class="bi-gear" style="font-size: 1.6rem; "></i></li>-->


      <!--      <li>   <i class="bi-chevron-right" style="font-size: 1.6rem; "></i>  </li>-->
      <!--      <li>   <i class="bi-chevron-left" style="font-size: 1.6rem; "></i>  </li>-->
      <!--      <li>   <i class="bi-check2-all" style="font-size: 1.6rem; "></i>  </li>-->
      <!--      <li>   <i class="bi-reply-all" style="font-size: 1.6rem; "></i>  </li>-->
    </ul>
  </div>

  <div style="height: 50vh; border-bottom: 1px solid #eaecef; display: flex; overflow: auto">
    <i class="bi-chevron-double-left" style="font-size: 1.6rem; "></i>
    <to-do-list></to-do-list>
    <to-do-list></to-do-list>
    <to-do-list></to-do-list>
    <to-do-list></to-do-list>
    <to-do-list></to-do-list>
    <i class="bi-chevron-double-right" style="font-size: 1.6rem; "></i>
  </div>


</template>

<script>
    // import uniqueId from "lodash.uniqueid";
    import toDoList from "./components/toDoList";

    export default {
        name: 'App',
        components: {
            toDoList
        },
        data() {
            return {
                ToDoItems: []
            }
        },
        methods: {
            addItem() {

            }
        }

    }
</script>

<style>

</style>
`