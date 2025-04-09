const userAgents = {
    pc: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    android: "Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
    apple: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1"
};
var var1={
    是否整体显示: false,
    show:true,
    title: '这是标题文本',
    name: '启动代码',
    browserPath: "",
    debug_port: "9233",
    proxy_url: "",
    UA:"pc",
    是否忽略证书错误: false,
    是否静音: false,
    是否无头: false,
    是否设置UA: false,
    url:`https://www.baidu.com/`,
    wenben: `co.set_browser_path(r'${this.browserPath}')`,
    wenben_style: `width: 95%; padding: 12px; border: 2px solid #4CAF50; border-radius: 4px;
    background-color: #f8f8f8; font-size: 16px; color: #333; resize: vertical;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.3s ease;font-family: consolas, 'Courier New', Courier, monospace;
    font-size:12px;`
}

const config2 = {
    el: '#home2',
    data() {
        return var1;
    },
    methods: {

        getCurrentTime() {
            const now = new Date();
            return now.toLocaleString(); // 返回格式如：2023/10/5 下午3:45:30
        },
        updateWenben() {
            
        },

        toUA(u){
            if (u=="pc"){return userAgents.pc;}
            if (u=="安卓"){return userAgents.android;}
            if (u=="苹果"){return userAgents.apple;}
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
            if (this.UA && this.是否设置UA) {co.push(`co.set_user_agent('${this.toUA(this.UA)}')`);}
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
const vdp2 = new Vue(config2)