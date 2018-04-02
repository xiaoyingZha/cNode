<template>
  <div style="overflow: hidden;">
    <h3>{{title}}----{{books.length}}</h3>
    <div><input ref="val" type="text"><button @click="searchBooks">搜索</button></div>
    <div v-if="books.length==0">加载中...,请稍后...</div>
    <div v-else style="height:600px;overflow: auto;">
      <ul>
        <li v-for="v,i in books">
          <h3>{{v.title}}</h3>
          <img :src="v.images.small" alt="">
        </li>
      </ul>
    </div>
    <div class="page">
      <button @click="prev">上一页</button>
      <button @click="next">下一页</button>
    </div>
  </div>
</template>

<script>
  import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'

    export default {
        name: "list-books",
        data(){
          return {
            title:'this is books list !!!'
          }
        },
        computed:{
          ...mapState([
            'total',
            'count',
            'start',
            'books',
            'q'
          ]),
          ...mapGetters([
            'pageNum'
          ]),
        },
      methods:{
        ...mapMutations([
          'changePageNum',
          'editTotal',
          'editQ',
          'editStart',
          'updateBooks',
        ]),
        ...mapActions([
          'changePageNum',
          'getBooks'
        ]),
        searchBooks(){
          this.editQ(this.$refs.val.value);
          this.getBooks();
          console.log(this.books)
        },
        prev(){
          if(this.start==0) return;
          this.editStart(this.start-this.count);
          this.getBooks();
        },
        next(){
          if(this.start+this.count>=this.total) return;
          this.editStart(this.start+this.count);
          this.getBooks();
        }
      }
    }
</script>

<style scoped>

</style>
