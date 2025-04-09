const config3 = {
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
};

const vdp3 = new Vue(config3);