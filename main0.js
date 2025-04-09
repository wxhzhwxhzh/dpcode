const config0 = {
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
          
          vdp2.show=0;
          vdp3.show=0;
          vdp4.show=0;
          tab.show=1; 
       }, 
    }
}

const vdp0 = new Vue(config0)
vdp0.switchHome(vdp2);