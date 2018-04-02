<template>
  <div style="overflow: hidden;">
    <h3>{{listBooksTitle}}--搜到的图书总数{{total}}--总页数{{pageNum}}---当前是第***页</h3>
    <input type="text" ref="val"/><button @click="searchBook">搜索</button>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <!--<button @click="prePage">上一页</button>-->
    <!--<button @click="nextPage">下一页</button>-->
    <div v-if="books.length==0">加载中...,请稍后...</div>
    <div v-else style="height:600px;overflow: auto;">
      <ul>
        <li
          v-for="v,i in books"
          :key="keyId++"
        >
          <h3>{{v.title}}</h3>
          <img :src="v.images.small" alt="">
        </li>
      </ul>
    </div>

  </div>
</template>

<script>

  import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'

    export default {
        name: "list-books",
        data(){
          return{
            keyId:0
          }
        },
        computed:{
          ...mapState([
            'listBooksTitle',
            'total',
            'start',
            'count',
            'books'
          ]),
          ...mapGetters([
            'pageNum'
          ])
        },
      methods:{
      ...mapMutations([
          'editQ'
        ]),
      ...mapActions([
          'getBooks'
        ]),
          searchBook(){
          // this.$refs.val.value;
          this.editQ(this.$refs.val.value);
          this.getBooks();
        }
      }
    }
</script>

<style scoped>

</style>
