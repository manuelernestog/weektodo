<template>
  <ul class="list-group">
    <li v-for="item in linkList" :key="item" class="list-group-item">
      <div class="d-flex list-item justify-content-between" @click="linkAction(item.link,item.linktype)">
        <div class="item-img">
          <i v-if="item.ico" :style="'font-size: 20px; color: '+ item.color" :class="item.ico"></i>
          <img v-if="item.img" :src="item.img" height="22">
        </div>
        <div class="align-self-center w-100">{{item.name}}</div>
      </div>
    </li>
  </ul>
</template>

<script>

    export default {
        name: "donateModal",
        data() {
            return {
            }
        },
        props: {
            linkList: {type: Array, required: true}
        },
        methods: {
            linkAction: function (link, linktype) {
                switch (linktype) {
                    case 'email':
                        this.emailLink(link);
                        break;
                    case 'tagId':
                        this.tagIdLink(link);
                        break;
                    case 'external':
                        this.externaLink(link);
                        break;
                }
            },
            emailLink: function (link) {
                window.open(link);
            },
            externaLink: function (link) {
                let isElectron = require("is-electron");
                if (isElectron()) {
                    require('electron').shell.openExternal(link, '_blank');
                } else {
                    window.open(link, '_blank');
                }
            },
            tagIdLink: function (id) {
                document.getElementById(id).click();
            }
        }
    }
</script>

<style scoped>
  .list-group-item {
    background-color: unset;
    border: none;
    padding: .66rem 1rem;
    transition: 0.4s cubic-bezier(0.2, 1, 0.1, 1);
  }

  .dark-theme .list-group-item {
    color: #c9d1d9;
  }

  .list-group-item:hover {
    background-color: #eaecef;
  }

  .dark-theme .list-group-item:hover {
    background-color: #171b20;
  }

  .list-item {
    cursor: pointer;
  }

  .item-img {
    margin-right: 24px;
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