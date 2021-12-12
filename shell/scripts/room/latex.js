function chat_container_renderLaTeX() {
    let chat_list = chat_container.getElementsByTagName('li');
    for (let e = 0; e < chat_list.length; e++) {
        renderMathInElement(chat_list[e], {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false },
                { left: '\\(', right: '\\)', display: false },
                { left: '\\[', right: '\\]', display: true }
            ],
            throwOnError: false
        });
    }
}
