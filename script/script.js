function getDocument(url) {
    return fetch(url).then(res => res.text());
}

function generateHomePage() {
    let main = document.querySelector(".main");
    Object.keys(documentReference).map((key) => {
        let div = document.createElement("div");
        let title = document.createElement("h4");
        let digest = document.createElement("p");
        let readMore = document.createElement("a");
        title.appendChild(document.createTextNode(documentReference[key].title));
        digest.appendChild(document.createTextNode(documentReference[key].digest));
        readMore.appendChild(document.createTextNode("Read more"));
        readMore.href = "/#" + documentReference[key].file;
        readMore.classList.add("read-more");
        digest.appendChild(readMore);
        div.appendChild(title);
        div.appendChild(digest);
        return div;
    }).forEach(div => {
        main.appendChild(div);
    });
}

function generateDocumentContent(documentURL) {
    getDocument(documentURL)
        .then((document) => {
            document.querySelector(".main").innerHTML = marked.parse(document);
        })
        .catch((err) => {
            generateHomePage();
        })
}

function loadPage(path) {
    if(path) {
        generateDocumentContent(path.substr(1));
    }
    else {
        generateHomePage();
    }
}


window.onload = () => {
    // document.querySelector(".main").textContent = "Main content body. For now its blank.";
    loadPage(window.location.hash);
}

window.onhashchange = () => {
    loadPage(window.location.hash);
}