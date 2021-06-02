function accessAJAX(filename,func){
    const request = new XMLHttpRequest();
    request.open('GET',filename);
    // 下载成功，status不明
    request.onreadystatechange = () =>{
        if(request.readyState === 4 && (request.status >=200 && request.status <300)) {
            console.log('Request Succeed: ');
            console.log(request.response);
            func(request.response);
        }
    };
    request.onerror = () =>{
        console.log('Request Error: ');
        console.log(request.response);
    };
    request.send();
}
// AJAX 加载 CSS 生效
getCSS.onclick = () =>{
    // filename: '/style.css'
    accessAJAX('/style.css',(response)=>{
        const style = document.createElement('style');
        style.innerHTML = response;
        document.head.appendChild(style);
    });

}

// AJAX 加载 JS 执行
getJS.onclick = () =>{
    // filename: /2.js
    accessAJAX('/2.js',(response)=>{
            const script = document.createElement('script');
            script.innerHTML = response;
            document.body.appendChild(script);

    });
}

// AJAX 加载 HTML 显示
getHTML.onclick = () =>{
    // filename: /3.html
    accessAJAX('/3.html',(response)=>{
        const div = document.createElement('div');
        div.innerHTML = response;
        document.body.appendChild(div);
    });
}

// AJAX 加载 XML 获取节点内容
getXML.onclick = () =>{
    const request = new XMLHttpRequest();
    request.open('GET','/4.xml');
    request.onreadystatechange = () =>{
        if(request.readyState === 4 && (request.status >=200 && request.status <300)) {
            console.log('Request Succeed: ');
            // 自动获得XML DOM对象
            console.log(request.responseXML);

            const dom = request.responseXML;
            const text = dom.getElementsByTagName('warning')[0].textContent;
            const content = text.trim();
            console.log(content); // 去除多余换行符

            const div = document.createElement('div');
            div.innerHTML = content;
            document.body.appendChild(div);
        }
    }
    request.onerror = () =>{
        console.log('Request Error: ');
        console.log(request.response);
    };
    request.send();
}

// AJAX 加载 JSON 转化为对象
getJSON.onclick = () =>{
    accessAJAX('/5.json',(response)=>{
        const JSONobject = JSON.parse(response);
        myName.textContent = " - " + JSONobject.name;
    });
}

// 模拟分页操作
let n = 1;
getPage.onclick = () =>{
    n+=1;
    const request = new XMLHttpRequest();
    request.open('GET',`/page${n}`);
    request.onreadystatechange = () => {
        if (request.readyState === 4 && (request.status >= 200 && request.status < 300)) {
            const array = JSON.parse(request.response);
            array.forEach(item =>{
                const li = document.createElement('li');
                li.textContent = item.id;
                xxx.appendChild(li)
            });

        }
    };
    request.send();
}