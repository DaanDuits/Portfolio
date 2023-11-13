if (!document.getElementById('blog-post'))
{
    console.log(lang);
    let message = document.createElement("p");
    if (lang == 'NL') {
        message.innerHTML = "Er zijn nog geen blog posts beschikbaar!"
    }
    else{
        message.innerHTML = "There are no blog posts available yet!"
    }
    message.id = "message";
    document.getElementById('blog-list').appendChild(message);
}else {
    let blogs = document.getElementById('blogs');
    blogs.children[blogs.children.length - 1].style.borderBottomRightRadius = '2vw';
    blogs.children[blogs.children.length - 1].style.borderBottomLeftRadius = '2vw';
}