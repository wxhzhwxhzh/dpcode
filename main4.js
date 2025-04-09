
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
    data: function () {
      return {
        count: 0
      }
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
  })
  


  Vue.component('blog-post', {
    props: ['title'],
    template: '<h3>{{ title }}</h3>'
  })


  Vue.component('blog-post2', {
    props: ['post'],
    template: `
      <div class="blog-post">
        <h3>{{ post.title }}</h3>
        <div v-html="post.content"></div>
      </div>
    `
  })







ps=  [
    { id: 1, title: 'My journey with Vue',content:'123' },
    { id: 2, title: 'Blogging with Vue',content:'456' },
    { id: 3, title: 'Why Vue is so fun' ,content:'789'}
  ]




its=[
    { message: 'Foo' },
    { message: 'Bar' }
  ]




const vdp4 = new Vue({

    el: '#home4',
    data() {
        return {

            show: 0,
            test: '测试',
            items: its,
            inputValue: '',
            posts: ps,

        };
    },
    methods: {
       updateItems(){
        this.items.push({ message: this.inputValue }); 
       } 
    }

});




