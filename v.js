// #region 定义 OverlayTextarea 组件
var sss=Vue.component('overlay-textarea', {
    template: `
        <div v-if="visible" class="overlay"  >
            <div class="textarea-container">
                <h3>请输入 {{placeholder}}</h3>
                <textarea v-model="text" :placeholder="placeholder" style="width: 80vw; height: 80vh;"></textarea>
                <button @click="close">保存并关闭</button>
            </div>
        </div>
    `,
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: '初始化js内容'
        }
    },
    data() {
        return {
            text: 'console.log(123)'
        };
    },
    methods: {
        close() {
            this.$emit('close', this.text); // 触发 close 事件并传递文本内容
        }
    }
});

// 以下是使用示例
// new Vue({
//     el: '#app',
//     data: {
//         showOverlay: false
//     },
//     methods: {
//         openOverlay() {
//             this.showOverlay = true;
//         },
//         handleClose() {
//             this.showOverlay = false;
//         }
//     }
// }); 



//  #region  第2个页面
const config2 = {

    el: '#home2',
    data() {
        return {
            是否整体显示: false,
            show:true,
            title: '这是标题文本',
            name: '启动代码',
            browserPath: "",
            debug_port: "9233",
            proxy_url: "",
            UA:"pc",
            showOverlay:true,
            是否忽略证书错误: false,
            是否静音: false,
            是否无头: false,
            是否设置UA: false,
            是否最大化: false,
            url:`https://www.baidu.com/`,
            wenben: `co.set_browser_path(r'')`,
            wenben_style: `width: 95%; padding: 12px; border: 2px solid #4CAF50; border-radius: 4px;
            background-color: #f8f8f8; font-size: 16px; color: #333; resize: vertical;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.3s ease;font-family: consolas, 'Courier New', Courier, monospace;
            font-size:12px;`,
            userAgents: {},
            initJs:{
                启用:false,
                显示:true,
                code:`co.set_b*****`,
            }    
            
        };
       
    },
    methods: {

        getCurrentTime() {
            const now = new Date();
            return now.toLocaleString(); // 返回格式如：2023/10/5 下午3:45:30
        },
        updateWenben() {
            
        },

        toUA(u){
            if (u=="pc"){return this.userAgents.pc;}
            if (u=="安卓"){return this.userAgents.android;}
            if (u=="苹果"){return this.userAgents.apple;}
        },
        copyToClipboard(text) {
            
            if (navigator.clipboard && window.isSecureContext) {
                alert("已复制到剪贴板");
                return navigator.clipboard.writeText(text);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                textArea.remove();
                alert("已复制到剪贴板");
            };
            
            
        },
        copyCode(){
            this.copyToClipboard(this.code);
        },
        openOverlay() {
            this.initJs.显示 = true;
        },
        handleClose(txt) {
            this.initJs.显示 = false;
            console.log(txt);
            this.initJs.code=txt;
        }   
    },
    computed: {
        // 计算属性：具有缓存性
        outputContent() {
            console.log('computed执行了'); // 每次计算属性求值时，在控制台打印日志
            // 将title和content属性的值拼接成一个新的字符串返回
            return '标题为: ' + this.title + ',' + '内容为' + this.content;
        },
        code() {
            let co=[];
            if (this.是否忽略证书错误) {co.push(`co.set_argument('--ignore-certificate-errors')`); }
            if (this.proxy_url) {co.push(`co.set_proxy('${this.proxy_url}')`);}
            if (this.debug_port) {co.push(`co.set_local_port('${this.debug_port}')`);}
            if (this.browserPath) {co.push(`co.set_browser_path(r'${this.browserPath}')`);}
            if (this.是否静音) {co.push(`co.mute(True)`);}
            if (this.是否无头) {co.push(`co.headless(True)`);}
            if (this.是否最大化) {co.push(`co.set_argument('--start-maximized')`);}
            if (this.UA && this.是否设置UA) {co.push(`co.set_user_agent('${this.toUA(this.UA)}')`);}
            let initjs=[]
            if (this.initJs.启用){initjs.push(`tab.add_init_js('''${this.initJs.code}''')`)}
            let a = `                  
        
#!/usr/bin/env python
# -*- coding:utf-8 -*-
#-导入库
from DrissionPage import Chromium, ChromiumOptions
# 创建配置对象
co = ChromiumOptions()
${co.join('\n')}

# 创建浏览器对象
browser = Chromium(co)
tab = browser.latest_tab
${initjs.join('\n')}
tab.get("${this.url}")
#访问网页
print(tab.title)

`
            return a;
        }
    },
    watch: {
        // 监听属性：不具有缓存性
        title(newValue, oldValue) { // 监听title属性的变化
            console.log('title属性发生了变化'); // 每次title属性发生变化时，在控制台打印日志
            console.log('新值为：' + newValue); // 打印新值 
        },
        browserPath(newValue, oldValue) { // 监听title属性的变化
            console.log('browserPath属性发生了变化'); // 每次title属性发生变化时，在控制台打印日志
            console.log('新值为：' + newValue); // 打印新值
            this.updateWenben();
        },

    }

};
const BrowserTab = new Vue(config2)
BrowserTab.userAgents={
    pc: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    android: "Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
    apple: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1"
};

//  #region  第3个页面

const vdp3 = new Vue( {
    el: '#home3',
    data() {
        return {
            是否整体显示: true,
            name: '语法转换',
            show: true,
            test: '测试',
            raw_string:'<input type="submit" id="su" value="百度一下" class="bg s_btn">',
            raw_string_style: `width: 50%; padding: 5px; border: 2px solid #4CAF50; border-radius: 4px;margin-left:10px;`,
            xpath_string: `//input[@id="kw"]`,
            
        };
    },
});


//  #region  第4个页面

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

//  #region  第0个页面


const vdp0 = new Vue({
    el: '#home0',
    data() {
        return {
            test: '测试',
            showhome: true,
            showhome3: true,
            home4: 'home4',
            tab:{
                t2:'启动代码',
                t3:'语法转换',
                t4:'设置',
                t5:'关于',
            }
        };
    },
    methods: {
       switchHome(tab) {
          
          BrowserTab.show=0;
          vdp3.show=0;
          vdp4.show=0;
          tab.show=1; 
       }, 
    }
})

vdp0.switchHome(BrowserTab);
